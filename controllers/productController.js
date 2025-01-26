const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;

// create new products by seller or admin
module.exports.createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    length,
    width,
    height,
    weight,
    color,
    material,
  } = req.body;

  const userId = req.user.id;

  const originalSlug = slugify(title, {
    lower: true,
    remove: /[^\w\s]/g,
    strict: true,
  });

  let slug = originalSlug;
  let suffix = 1;
  while (await productModel.exists({ slug })) {
    slug = `${originalSlug}-${suffix++}`;
  }

  if (!title || !description || !price) {
    res.status(400).json({ message: "All fields are required" });
    throw new Error("All fields are required");
  }

  // upload image
  let fileData = {};
  if (req.file) {
     let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Bidding/Product",
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
      // filePath: `/uploads/${req.file.filename}`,
    };
  }

  const product = await productModel.create({
    user: userId,
    slug: slug,
    title,
    description,
    price,
    category,
    length,
    width,
    height,
    weight,
    color,
    material,
    image: fileData,
  });
  res.status(201).json({ success: true, data: product });
});

// get product by id
module.exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id).populate("user");
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    throw new Error("Product not found");
  }
  res.json({ success: true, data: product });
});

// get all products
module.exports.getAllProduct = asyncHandler(async (req, res) => {
  const products = await productModel
    .find({ })
    .sort("-createdAt")
    .populate({
      path: "user",
      select: "-password",
    });
  res.json({ success: true, data: products });
});

// get sold products by seller
module.exports.getSellerSoldProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const products = await productModel
    .find({ user: userId, isSoldout: true })
    .sort("-createdAt")
    .populate({
      path: "user",
      select: "-password",
    });

  // if (!products || products.length === 0) {
  //   res.status(404).json({message:"No sold products found"});
  //   throw new Error("No sold products found");
  // }
  res.json({ success: true, data: products });
});

// get  products i wonned
module.exports.getWonedProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const products = await productModel
    .find({ isSoldout: true, soldTo: userId.toString() })
    .sort("-createdAt");

  // if (!products || products.length === 0) {
  //   res.status(404).json({message:"No woned products found"});
  //   throw new Error("No sold products found");
  // }
  res.json({ success: true, data: products });
});

// get sold products by admin
module.exports.getAllSoldProducts = asyncHandler(async (req, res) => {
  const products = await productModel
    .find({ isSoldout: true })
    .sort("-createdAt")
    .populate({
      path: "user",
      select: "-password",
    });

  // if (!products || products.length === 0) {
  //   res.status(404).json({message:"No sold products found"});
  //   throw new Error("No sold products found");
  // }
  res.json({ success: true, data: products });
});

// delete product
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
    throw new Error("Product not found");
  }

  // Check if the product belongs to the logged-in user
  if (product.user?.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403).json({ message: "Unauthorized to delete this product" });
    throw new Error("Unauthorized to delete this product");
  }

  // delete product from cloudinary
  if (product.image && product.image.public_id) {
    try {
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
    }
  }

  await productModel.findByIdAndDelete(id);
  res.status(200);
  res.json({ success: true, message: "Product deleted successfully" });
});

// update product
module.exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    length,
    width,
    height,
    weight,
    color,
    material,
  } = req.body;

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    throw new Error("Product not found");
  }

  // Check if the product belongs to the logged-in user
  if (product.user?.toString() !== req.user.id) {
    res.status(403).json({ message: "Unauthorized to update this product" });
    throw new Error("Unauthorized to update this product");
  }

  // upload image
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Bidding/Product",
        resource_type: "image",
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500);
      throw new Error("Image upload failed");
    }

    // if update the image then remove previous image from cloudinary
    if (product.image && product.image.public_id) {
      try {
        await cloudinary.uploader.destroy(product.image.public_id);
      } catch (error) {
        console.error("Cloudinary delete image error:", error);
      }
    }

    fileData = {
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      filePath: uploadedFile.secure_url, 
      public_id: uploadedFile.public_id,
      // filePath: `/uploads/${req.file.filename}`,
    };
  }

  const updateProduct = await productModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      length,
      width,
      height,
      weight,
      color,
      material,
      image: req.file ? fileData : product?.image,
    },
    {
      new: true,
    }
  );

  if (!updateProduct) {
    res.status(404).json({ message: "Product update failed" });
    throw new Error("Product update failed");
  }

  res
    .status(201)
    .json({
      success: true,
      message: "product update successfully",
      data: updateProduct,
    });
});

// get my products by my user id
module.exports.getUserProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const products = await productModel
    .find({ user: userId })
    .sort("-createdAt")
    .populate({
      path: "user",
      select: "-password",
    });
  res.json({ success: true, data: products });
});

// verify and add commision in products by admin
module.exports.verifyAndAddCommission = asyncHandler(async (req, res) => {
  const { commission } = req.body;
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  product.isVerify = true;
  product.commission = commission;
  await product.save();
  res
    .status(200)
    .json({ success: true, message: "Product verified successfully" });
});

// get all products by admin
module.exports.getAllProductByAdmin = asyncHandler(async (req, res) => {
  const products = await productModel.find({}).sort("-createdAt").populate({
    path: "user",
    select: "-password",
  });
  res.json({ success: true, data: products });
});

// delete product by admin
module.exports.deleteProductByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // delete product from cloudinary
  if (product.image && product.image.public_id) {
    try {
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
    }
  }

  await productModel.findByIdAndDelete(id);
  res.status(200);
  res.json({ success: true, message: "Product deleted successfully" });
});
