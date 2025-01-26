import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const BIDDING_URL = `${BACKEND_URL}/bidding/`;

const placeBid = async (formData) => {
  const response = await axios.post(BIDDING_URL, formData);
  return response.data;
};

const fetchBiddingHistory = async (id) => {
  const response = await axios.get(`${BIDDING_URL}${id}`);
  return response.data;
};


// buyer own bids
const getAllBidsHistory = async () => {
  const response = await axios.get(BIDDING_URL + "histories");
  return response.data;
};

// buyer own bids
const getMyBidsHistory = async () => {
  const response = await axios.get(BIDDING_URL);
  return response.data;
};

// delelte bid by buyer own 
const deleteBid = async (id) => {
  const response = await axios.delete(`${BIDDING_URL}${id}`);
  return response.data;
};

const sellProduct = async (productId) => {
  const response = await axios.post(BIDDING_URL + "sell", productId);
  return response.data;
};

const biddingService = {
  placeBid,
  fetchBiddingHistory,
  getMyBidsHistory,
  getAllBidsHistory,
  deleteBid,
  sellProduct,
};

export default biddingService;
