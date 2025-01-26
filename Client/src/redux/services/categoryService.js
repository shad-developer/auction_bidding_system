import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const CATEGORY_URL = `${BACKEND_URL}/category/`;

const createCategory = async (title) => {
  const response = await axios.post(CATEGORY_URL, title);
  return response.data;
};

const getAllCategory = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};

const updateCategory = async (categoryId, title) => {
  const response = await axios.put(`${CATEGORY_URL}${categoryId}`, title); 
  return response.data;
};

const getCategoryById = async (categoryId) => {
  const response = await axios.get(`${CATEGORY_URL}${categoryId}`);
  return response.data;
};

const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${CATEGORY_URL}${categoryId}`); 
  return response.data;
};



const categoryService = {
  createCategory,
  getAllCategory,
  updateCategory,
  getCategoryById,
  deleteCategory
};

export default categoryService;
