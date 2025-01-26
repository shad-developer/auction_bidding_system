import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const AUTH_URL = `${BACKEND_URL}/user/`;

const register = async (userData) => {
  const response = await axios.post(AUTH_URL +"register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(AUTH_URL +"login", userData);
  return response.data;
};


const logout = async () => {
  const response = await axios.get(AUTH_URL +"logout");
  return response.data.message;
};


const getLoginStatus = async () => {
  const response = await axios.get(AUTH_URL +"loggedin");
  return response.data;
};


const getUserProfile = async () => {
  const response = await axios.get(AUTH_URL +"getuser");
  return response.data;
};



const loginUserAsSeller = async (userData) => {
  const response = await axios.post(AUTH_URL +"seller", userData, {
    withCredentials: true,
  });
  return response.data;
};


// selling amount
const getUserIncome = async () => {
  const response = await axios.get(AUTH_URL + "sell-amount");
  return response.data;
};


// only accessible by admin
const getAdminIncome = async () => {
  const response = await axios.get(AUTH_URL + "estimate-income");
  return response.data;
};


// only accessible by admin
const getAllUsers = async () => {
  const response = await axios.get(AUTH_URL + "users");
  return response.data;
};


// verify email
const verifyEmail = async (code) => {
    const response = await axios.post(`${AUTH_URL}/verify-email`, code,  {
      withCredentials: true,
    });
    return response.data;
};



// forgot password
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(AUTH_URL + "forgot-password", {email}, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};


// reset password
const resetPassword = async (data) => {
  try {
    const response = await axios.post(AUTH_URL + "reset-password", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};


// update user 
const updateProfile = async (formData) => {
  const response = await axios.put(AUTH_URL +"update-profile", formData);
  return response.data;
};


// send mail message
const sendMessage = async (data) => {
  try {
    const response = await axios.post(AUTH_URL + "send-message", data);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUserProfile,
  loginUserAsSeller,
  getUserIncome,
  getAdminIncome,
  getAllUsers,
  forgotPassword,
  resetPassword,
  updateProfile,
  sendMessage,
  verifyEmail
};

export default authService;
