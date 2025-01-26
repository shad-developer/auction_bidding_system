const express = require('express')
const router = express.Router();
const {protectedRoute} = require('../middleware/authMiddleware');
const reviewsController = require('../controllers/reviewsController');
const upload = require("../utils/fileUpload");

router.get("/:productId",  reviewsController.getAllReviewsByProductId);
router.get("/:productId/review/:id", protectedRoute, reviewsController.getReview);
router.post("/", protectedRoute, upload.single('image'), reviewsController.createReview);
router.put("/:id", protectedRoute, reviewsController.updateReview);
router.delete("/:id", protectedRoute, reviewsController.deleteReview);

module.exports = router;