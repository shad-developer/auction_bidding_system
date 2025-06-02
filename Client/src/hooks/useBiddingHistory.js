import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBidsHistory } from "../redux/features/biddingSlice";

const useBiddingHistory = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.bidding);

  useEffect(() => {
    dispatch(getAllBidsHistory());
  }, [dispatch]);

  // Group bidding histories by product ID
  const groupedHistories = histories?.reduce((acc, bid) => {
    const productId = bid.product.toString();
    if (!acc[productId]) acc[productId] = [];
    acc[productId].push(bid);
    return acc;
  }, {});

  // Find the highest bid for a product
  const highestBid = (productId) => {
    const bids = groupedHistories[productId];
    if (!bids) return 0;
    return Math.max(...bids?.map((bid) => bid.price));
  };

 // Get total number of bids for a product
  const totalBids = (productId) => {
    const bids = groupedHistories[productId];
    return bids ? bids.length : 0;
  };


  return {
    groupedHistories,
    highestBid,
    totalBids
  };
};

export default useBiddingHistory;
