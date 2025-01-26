import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const PRODUCT_URL = `${BACKEND_URL}/product/`;

const createProduct = async (formData) => {
  const response = await axios.post(PRODUCT_URL, formData);
  return response.data;
};

const getAllProduct = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data;
};

const getUserProduct = async () => {
  const response = await axios.get(PRODUCT_URL + "user");
  return response.data;
};

// const getAllWonProduct = async () => {
//     const response = await axios.get(PRODUCT_URL +"user");
//     return response.data;
//   };

const getProduct = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}${id}`);
  return response.data;
};

// get all sold products by admin
const getAllSoldProducts = async () => {
  const response = await axios.get(PRODUCT_URL + "admin/sold-products");
  return response.data;
};

// seller product
const getMySoldProducts = async () => {
  const response = await axios.get(PRODUCT_URL + "sold");
  return response.data;
};

// get woned products

const getWonedProducts = async () => {
  const response = await axios.get(PRODUCT_URL + "won-products");
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.put(`${PRODUCT_URL}${id}`, formData);
  return response.data;
};

const updateProductByAdmin = async (id, formData) => {
  const response = await axios.patch(
    `${PRODUCT_URL}admin/product-verify/${id}`,
    formData
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}${id}`);
  return response.data;
};

const productService = {
  createProduct,
  getProduct,
  getAllProduct,
  getUserProduct,
  deleteProduct,
  updateProduct,
  updateProductByAdmin,
  getAllSoldProducts,
  getWonedProducts,
  getMySoldProducts,
};

export default productService;
