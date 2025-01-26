import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const REVIEWS_URL = `${BACKEND_URL}/reviews/`;

const createReview = async (formData) => {
  const response = await axios.post(REVIEWS_URL, formData);
  return response.data;
};

  const getAllReviewsByProductId = async (productId) => {
    const response = await axios.get(`${REVIEWS_URL}${productId}`);
    return response.data;
  };

// const updateCategory = async (categoryId, title) => {
//   const response = await axios.put(`${CATEGORY_URL}${categoryId}`, title);
//   return response.data;
// };

// const getCategoryById = async (categoryId) => {
//   const response = await axios.get(`${CATEGORY_URL}${categoryId}`);
//   return response.data;
// };

// const deleteCategory = async (categoryId) => {
//   const response = await axios.delete(`${CATEGORY_URL}${categoryId}`);
//   return response.data;
// };

const reviewService = {
  createReview,
  getAllReviewsByProductId,
  //   updateCategory,
  //   getCategoryById,
  //   deleteCategory
};

export default reviewService;
