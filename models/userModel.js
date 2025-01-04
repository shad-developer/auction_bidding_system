const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    balance: {
      type: Number,
      default: undefined,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    // for become seller
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    storeName: {
      type: String,
      default: undefined,
    },
    image: {
      type: Object,
      default: {},
    },
    commissionBalance: {
      type: Number,
      default: undefined,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    ResetPasswordToken: String,
    ResetPasswordTokenExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
