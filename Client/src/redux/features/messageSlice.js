import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import messageService from "../services/messageService"; 

const initialState = {
    messages: [], 
    users: [], 
    selectedUser: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "", 
};

export const getMessages = createAsyncThunk(
    "message/getMessages",
    async (receiverId, thunkApi) => {
        try {
            const response = await messageService.getMessages(receiverId); 
            return response;
        } catch (error) {
            const message =
            error.response?.data?.message || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async ({ receiverId, message }, thunkApi) => {
        try {
            const response = await messageService.sendMessage(receiverId, message); 
            return response; 
        } catch (error) {
            const message =
            error.response?.data?.message || error.message || error.toString();
            toast.error(message); 
            return thunkApi.rejectWithValue(message);
        }
    }
);

// get users for sidebar
export const getUserforSidebar = createAsyncThunk(
    "message/getUserforSidebar",
    async (_, thunkApi) => {
        try {
            const response = await messageService.getUserforSidebar();
            return response;
        } catch (error) {
            const message =
            error.response?.data?.message || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);


const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMessages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.messages = action.payload; 
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(sendMessage.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.messages.push(action.payload);
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getUserforSidebar.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserforSidebar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
        })
        .addCase(getUserforSidebar.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    },
});

export const { setSelectedUser } = messageSlice.actions;

export default messageSlice.reducer;
