const asyncHandler = require("express-async-handler");
const reviewModel = require("../models/reviewsModel");
const productModel = require('../models/productModel'); 
const cloudinary = require("cloudinary").v2;


// create review
module.exports.createReview = asyncHandler(async (req, res) => {
  
  const { productId, rating, description } = req.body;

  const userId = req.user.id;

  if (!rating || !description || !productId) {
    res.status(400).json({ message: "All fields are required" });
    throw new Error("All fields are required");
  }

  const product = await productModel.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    throw new Error("Product not found");
  }

   // upload image
   let fileData = {};
  if (req.file) {
      let uploadedFile;
     try {
       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
         folder: "Bidding/Reviews",
         resource_type: "image",
       });
     } catch (error) {
       console.error("Cloudinary upload error:", error);
       res.status(500).json({ message: "Image Upload Failed" });
       throw new Error("Image upload failed");
     }
     fileData = {
       fileName: req.file.originalname,
       fileType: req.file.mimetype,
       filePath: uploadedFile.secure_url, 
       public_id: uploadedFile.public_id,
     };
  }

   const newReview = await reviewModel.create({
    user: userId,
    product: productId,
    rating,
    description,
    image: fileData, 
  });

  product.reviews.push(newReview._id);
  await product.save();
  res.status(201).json({ message: "Review created", newReview });
});


//  get all reviews by product id
module.exports.getAllReviewsByProductId = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const reviews = await reviewModel
    .find({ product: productId })
    .populate("user", "name")
    .sort("-createdAt");
  if (!reviews) {
    res.status(404);
    throw new Error("reviews not found");
  }
  res.json({ success: true, data: reviews });
});

//   get review by id
module.exports.getReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await reviewModel
    .findById(id)
    .populate("user", "name")
    .sort("-createdAt");
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  res.json({ success: true, data: review });
});

// update review
module.exports.updateReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
  const { rating, description } = req.body;
  
  const review = await reviewModel.findByIdAndUpdate(
    id,
    {
      rating: rating,
      description: description,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  res
    .status(200)
    .json({ message: "Review Updated", success: true, data: review });
});



module.exports.deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewModel.findByIdAndDelete(id);
    if (!review) {
    res.status(404);
    throw new Error("Review not found");
    }
    res.status(200).json({ message: "Review deleted", success: true });

});


