const asyncHandler = require("express-async-handler");
const biddingModel = require("../models/biddingModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const sendMail = require("../utils/sendMail");

// get bidding history by product id
module.exports.getBiddingHistory = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const biddingHistory = await biddingModel
    .find({ product: productId })
    .sort("-createdAt")
    .populate("user")
    .populate("product");
  res.status(200).json({ success: true, data: biddingHistory });
});

// get all bidding histories
module.exports.getAllBiddingHistories = asyncHandler(async (req, res) => {
  const histories = await biddingModel.find({}).sort("-createdAt");
  res.json({ success: true, data: histories });
});

// place bid
module.exports.placeBid = asyncHandler(async (req, res) => {
  const { productId, price } = req.body;
  const userId = req.user._id;
  const product = await productModel
    .findById(productId)
    .populate("user", "name email");

  if (product?.user._id.toString() === userId.toString()) {
    return res
      .status(403)
      .json({ message: "You cannot place a bid on your own product" });
  }

  if (!product.isVerify) {
    res.status(400);
    throw new Error("Product not verified");
  }

  if (!product || product.isSoldout === true) {
    res.status(404);
    throw new Error("Product not found or sold out");
  }

  //   check if user bid already exist on this product
  const existingUserBid = await biddingModel.findOne({
    user: userId,
    product: productId,
  });

  const bidderName = req.user?.name; 
  const productTitle = product?.title;
  const ownerEmail = product.user?.email;
  const bidPrice = price; 

  const user = await userModel.findById(userId);
  if (user.balance < price) {
    return res.status(400).json({
      message: "Insufficient balance. Please add funds or link a bank card.",
    });
  }

  if (existingUserBid) {
    if (price <= existingUserBid.price) {
      res.status(400).json({
        message: "Bid price should be higher than the current bid price",
      });
      throw new Error("Bid price should be higher than the current bid price");
    }
    existingUserBid.price = price;
    await existingUserBid.save();
  
    user.balance -= price;
    await user.save();


    const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
        <h1>New Bid Placed on Your Product</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hello,</p>
        <p><strong>${bidderName}</strong> has placed a bid on your product <strong>${productTitle}</strong>.</p>
        <p><strong>Bid Price:</strong> $${bidPrice}</p>
        <p>Visit your dashboard to view and manage the bid.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>Auction Bidding System</strong></p>
      </div>
    </div>
  `;
    sendMail(ownerEmail, "New Bid Notification", emailTemplate);

    return res.status(200).json({ biddingProduct: existingUserBid });
  } else {
    const highestBid = await biddingModel
      .findOne({ product: productId })
      .sort({ price: -1 });

    if (highestBid && price <= highestBid.price) {
      res.status(400).json({
        message:
          "Bid price should be higher than the current highest bid price",
      });
      throw new Error(
        "Bid price should be higher than the current highest bid price"
      );
    }
  }

  const biddingProduct = await biddingModel.create({
    user: userId,
    product: productId,
    price,
  });
  
  user.balance -= price;
  await user.save();

  const emailTemplate = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
      <h1>New Bid Placed on Your Product</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p><strong>${bidderName}</strong> has placed a bid on your product <strong>${productTitle}</strong>.</p>
      <p><strong>Bid Price:</strong> $${bidPrice}</p>
      <p>Visit your dashboard to view and manage the bid.</p>
      <br />
      <p>Best regards,</p>
      <p><strong>Auction Bidding System</strong></p>
    </div>
  </div>
`;

  sendMail(ownerEmail, "New Bid Notification", emailTemplate);

  res.status(201).json({ success: true, data: biddingProduct });
});

// sell product
module.exports.sellProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const product = await productModel.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.isSoldout) {
    res.status(400);
    throw new Error("Product has already been sold");
  }

  if (product.user.toString() !== userId) {
    res.status(403);
    throw new Error("Unauthorized to sell this product");
  }

  // find the highest bid price
  const highestBid = await biddingModel
    .findOne({ product: productId })
    .sort({ price: -1 })
    .populate("user");
  if (!highestBid) {
    res.status(404).json({ message: "No bids found for this product" });
    throw new Error("No bids found for this product");
  }

  const commissionAmount = (product.commission / 100) * highestBid.price;
  const finalPrice = highestBid.price - commissionAmount;

  product.isSoldout = true;
  product.soldTo = highestBid.user;
  product.soldPrice = finalPrice;

  // update admin's commission balance and seller's balance
  const adminUpdate = userModel.updateOne(
    { role: "admin" },
    { $inc: { commissionBalance: commissionAmount } }
  );

  const sellerUpdate = userModel.updateOne(
    { _id: product.user },
    { $inc: { balance: finalPrice } }
  );

  await Promise.all([adminUpdate, sellerUpdate, product.save()]);

  // Send confirmation email
  const emailTemplate = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
      <h1>Congratulations!</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p>You have won the bid for the product. Your final price is:</p>
      <h2 style="font-size: 24px; color: #4CAF50; text-align: center;"><b>$${highestBid.price.toFixed(
        2
      )}</b></h2>
      <p>Thank you for participating!</p>
      <br />
      <p>Best regards,</p>
      <p>Bidding App</p>
    </div>
  </div>
`;

  // Send confirmation email
  sendMail(
    highestBid.user.email,
    "Bidding App - Confirmation of Your Winning Bid",
    emailTemplate
  );

  res.status(200).json({ message: "Product sold successfully", finalPrice });
});

// get my bids i placed as  buyer
module.exports.getMyBidsHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const bidsHistory = await biddingModel
    .find({ user: userId })
    .sort("-createdAt")
    .populate("user")
    .populate("product");
  res.status(200).json({ success: true, data: bidsHistory });
});

// delete my bid
module.exports.deleteMyBid = asyncHandler(async (req, res) => {
  const { bidId } = req.params;
  const userId = req.user._id;

  const bid = await biddingModel.findById(bidId);

  if (!bid) {
    res.status(404);
    throw new Error("Bid not found");
  }

  if (bid.user?.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Unauthorized to delete this bid");
  }

  await biddingModel.findByIdAndDelete(bidId);

  res.status(200).json({ success: true, message: "Bid deleted successfully" });
});

//send notification
