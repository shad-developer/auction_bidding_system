const express = require('express')
const router = express.Router();
const {protectedRoute, isAdmin, isSeller} = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');


router.post("/", protectedRoute, isAdmin, categoryController.createCategory);
router.get("/",  categoryController.getAllCategory);
router.get("/:id", protectedRoute, isAdmin, categoryController.getCategroy);
router.put("/:id", protectedRoute, isAdmin, categoryController.updateCategory);
router.delete("/:id", protectedRoute, isAdmin, categoryController.deleteCategory);



module.exports = router;