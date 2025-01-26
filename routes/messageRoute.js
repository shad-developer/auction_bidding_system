const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");
const {protectedRoute} = require("../middleware/authMiddleware");

router.get("/users", protectedRoute, messageController.getUserforSidebar);
router.get("/", protectedRoute, messageController.getMessages);
router.post("/send", protectedRoute, messageController.sendMessage);

module.exports = router;
