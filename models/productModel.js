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
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
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
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: "Review",
    }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
