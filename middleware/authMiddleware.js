const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protectedRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({message:"Not Authorized! Please Login"});
    throw new Error("Not authorized! Please Login");
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(verified.userId).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  req.user = user;
  next();
});

// check if admin
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({message:"Not authorized! Only Admins can access this route"});
    throw new Error("Not authorized! Only Admins can access this route");
  }
});

const isSeller = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.user.role === "seller") ||
    (req.user && req.user.role === "admin")
  ) {
    next();
  } else {
    res.status(403).json({message:"Not authorized! Only Sellers & Admin can access this route"});
    throw new Error("Not authorized! Only Sellers & Admin can access this route");
  }
});

module.exports = { protectedRoute, isAdmin, isSeller };
  