const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Product owner is required"],
    },
    title: {
      type: String,
      required: [true, "Product name is required"],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    commission: {
      type: Number,
      default: 0,
    },
    image: {
      type: Object,
      default: {},
    },
    category: {
      type: String,
      default: "All",
    },
    length: {
      type: Number,
      min: [0, "Length must be a positive number"],
    },
    width: {
      type: Number,
      min: [0, "Width must be a positive number"],
    },
    height: {
      type: Number,
      min: [0, "Height must be a positive number"],
    },
    weight: {
      type: Number,
      min: [0, "Weight must be a positive number"],
    },
    color: {
      type: String,
    },
    material: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    isSoldout: {
      type: Boolean,
      default: false,
    },
    soldTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
