const express = require('express')
const router = express.Router();
const {protectedRoute, isAdmin, isSeller} = require('../middleware/authMiddleware');
const biddingController = require('../controllers/biddingController');


router.get('/', protectedRoute, biddingController.getMyBidsHistory);
router.get("/histories", biddingController.getAllBiddingHistories);
router.get("/:productId", biddingController.getBiddingHistory);


router.post('/', protectedRoute, biddingController.placeBid);
router.post('/sell', protectedRoute, isSeller, biddingController.sellProduct);

// buyer delete own bid
router.delete('/:bidId', protectedRoute, biddingController.deleteMyBid);



module.exports = router;