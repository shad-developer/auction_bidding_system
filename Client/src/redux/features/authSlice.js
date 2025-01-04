import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("auth")) || null,
  users: [],
  isLoggedIn: !!localStorage.getItem("auth"),
  isError: false,
  errorType: null,
  userIncome: null,
  adminIncome: null,
  isSuccess: false,
  isLoading: false,
  message: "",
  
};

// Async actions
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const response = await authService.register(userData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await authService.login(userData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await authService.logout();
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const getLoginStatus = createAsyncThunk(
  "auth/status",
  async (_, thunkApi) => {
    try {
      const response = await authService.getLoginStatus();
      return response.loggedIn;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkApi) => {
    try {
      const response = await authService.getUserProfile();
      return response.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// login as seller
export const loginUserAsSeller = createAsyncThunk(
  "auth/seller",
  async (userData, thunkApi) => {
    try {
      const response = await authService.loginUserAsSeller(userData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get seller user income
export const getUserIncome = createAsyncThunk(
  "auth/get-income",
  async (_, thunkApi) => {
    try {
      const response = await authService.getUserIncome();
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get admin income
export const getAdminIncome = createAsyncThunk(
  "auth/get-admin-income",
  async (_, thunkApi) => {
    try {
      const response = await authService.getAdminIncome();
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/get-all-users",
  async (_, thunkApi) => {
    try {
      const response = await authService.getAllUsers();
      return response.users;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// verify email
export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (code, thunkApi) => {
    try {
      const response = await authService.verifyEmail(code);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// forgotPassword
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, thunkApi) => {
    try {
      const response = await authService.forgotPassword(email);
      // toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkApi) => {
    try {
      const response = await authService.resetPassword(data);
      // toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (formData, thunkApi) => {
    try {
      const response = await authService.updateProfile(formData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// send message email
export const sendMessage = createAsyncThunk(
  "auth/sendMessage",
  async (data, thunkApi) => {
    try {
      const response = await authService.sendMessage(data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success(action.payload);
        localStorage.setItem("auth", JSON.stringify(action.payload.user));
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.errorType = action.payload.type;
        toast.error(action.payload.message);
      })
      .addCase(loginUserAsSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // state.user = action.payload;
        // localStorage.setItem("auth", JSON.stringify(action.payload.user));
        toast.success("You Become Seller");
      })
      .addCase(loginUserAsSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
        toast.error(action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem("auth");
        state.isError = false;
        state.message = "";
        toast.success("Logout Successfully");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        localStorage.removeItem("auth");
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        localStorage.removeItem("auth");
      })
      .addCase(getUserIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userIncome = action.payload;
      })
      .addCase(getUserIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = true;
        state.message = action.payload;
      })
      .addCase(getAdminIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.adminIncome = action.payload;
      })
      .addCase(getAdminIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = true;
        state.message = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.users = action.payload;
        state.totalUsers = action.payload?.length;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        localStorage.setItem("auth", JSON.stringify(action.payload));
        state.user = action.payload;
        toast.success("Password Reset Successfully");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success("Message Sent Successfully");
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Exports
export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsSuccess = (state) => state.auth.isSuccess;
export default authSlice.reducer;
