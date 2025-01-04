import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import biddingService from "../services/biddingService";

const initialState = {
  history: [],
  histories:[],
  myBids:[],
  bidding: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// place bid
export const placeBid = createAsyncThunk(
  "bidding/create",
  async ({ productId, price }, thunkApi) => {
    try {
      const response = await biddingService.placeBid({ productId, price });
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchBiddingHistory = createAsyncThunk(
  "bidding/get-history",
  async (productId, thunkApi) => {
    try {
      const response = await biddingService.fetchBiddingHistory(productId);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// my bids 
export const getMyBidsHistory = createAsyncThunk(
  "bidding/get-my-bids-history",
  async (_, thunkApi) => {
    try {
      const response = await biddingService.getMyBidsHistory();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all bidding histories
export const getAllBidsHistory = createAsyncThunk(
  "bidding/get-all-bids-history",
  async (_, thunkApi) => {
    try {
      const response = await biddingService.getAllBidsHistory();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// delete my bid by me
export const deleteBid = createAsyncThunk(
  "bidding/delete-my-bids",
  async (bidId, thunkApi) => {
    try {
      const response = await biddingService.deleteBid(bidId);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const sellProduct = createAsyncThunk(
  "bidding/sell",
  async (productId, thunkApi) => {
    try {
      const response = await biddingService.sellProduct(productId);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const biddingSlice = createSlice({
  name: "bidding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
          state.message = action.message;
          state.bidding = action.payload;
        toast.success("Bid has been Placed");
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(sellProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(sellProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchBiddingHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBiddingHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.history = action.payload;
      })
      .addCase(fetchBiddingHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllBidsHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBidsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.histories = action.payload;
      })
      .addCase(getAllBidsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMyBidsHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyBidsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.myBids = action.payload;
      })
      .addCase(getMyBidsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Bid has been deleted");
      })
      .addCase(deleteBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});


export default biddingSlice.reducer;
