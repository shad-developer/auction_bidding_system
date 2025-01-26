const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {protectedRoute, isAdmin, isSeller} = require('../middleware/authMiddleware');
const upload = require("../utils/fileUpload");


router.get("/", productController.getAllProduct);
router.get("/user", protectedRoute, productController.getUserProduct);
router.get("/won-products", protectedRoute, productController.getWonedProducts);

// for seller
router.get("/sold", protectedRoute, isSeller, productController.getSellerSoldProducts);

router.get("/:id", productController.getProduct);

// seller routes
router.post("/", protectedRoute, isSeller, upload.single('image'), productController.createProduct);
router.put("/:id", protectedRoute, isSeller, upload.single('image'), productController.updateProduct);
router.delete("/:id", protectedRoute, isSeller, productController.deleteProduct);

// admin routes
router.get("/admin/sold-products", protectedRoute, isAdmin, productController.getAllSoldProducts);
router.get("/admin/product", protectedRoute, isAdmin, productController.getAllProductByAdmin);
router.patch("/admin/product-verify/:id", protectedRoute, isAdmin, productController.verifyAndAddCommission);
router.delete("/admin/product/:id", protectedRoute, isAdmin, productController.deleteProductByAdmin);

module.exports = router;
