import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MESSAGE_URL = `${BACKEND_URL}/messages`; 

const sendMessage = async (receiverId, messageContent) => {
    const response = await axios.post(`${MESSAGE_URL}/send`, {id: receiverId, message: messageContent });
    return response.data; 
};

const getMessages = async (receiverId) => {
    const response = await axios.get(`${MESSAGE_URL}/`,{ params: { id: receiverId } });
    return response.data; 
};


const getUserforSidebar = async () => {
    const response = await axios.get(`${MESSAGE_URL}/users`);
    return response.data; 
};


export default {
    sendMessage,
    getMessages,
    getUserforSidebar
};
