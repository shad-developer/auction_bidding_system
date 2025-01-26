import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "../services/productService";

const initialState = {
  products: [],
  userProducts: [],
  soldProducts: [],
  wonnedProducts: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create product
export const createProduct = createAsyncThunk(
  "product/create",
  async (FormData, thunkApi) => {
    try {
      const response = await productService.createProduct(FormData);
      return response;
    } catch (error) {
      
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// all products 
export const getAllProduct = createAsyncThunk(
    "product/get-all-product",
    async (_, thunkApi) => {
      try {
        const response = await productService.getAllProduct();
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);

  
export const getProduct = createAsyncThunk(
  "product/get-product-by-id",
  async (id, thunkApi) => {
    try {
      const response = await productService.getProduct(id);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//   my products
export const getUserProduct = createAsyncThunk(
    "product/get-user-product",
    async (_, thunkApi) => {
      try {
        const response = await productService.getUserProduct();
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
); 
  
// delete product by id
export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async (id, thunkApi) => {
      try {
        const response = await productService.deleteProduct(id);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);

// update product 
export const updateProduct = createAsyncThunk(
  "product/update-user-product",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await productService.updateProduct(id, formData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// update product 
export const updateProductByAdmin = createAsyncThunk(
  "product/update-product-by-admin",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await productService.updateProductByAdmin(id, formData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


//  get all sold products by admin

export const getAllSoldProducts = createAsyncThunk(
    "product/get-all-sold-product-by-admin",
    async (_, thunkApi) => {
      try {
        const response = await productService.getAllSoldProducts();
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);

export const getMySoldProducts = createAsyncThunk(
  "product/get-my-sold-product-seller",
  async (_, thunkApi) => {
    try {
      const response = await productService.getMySoldProducts();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//  get my won products // of buyer

export const getWonedProducts = createAsyncThunk(
    "product/get-won-product",
    async (_, thunkApi) => {
      try {
        const response = await productService.getWonedProducts();
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);

  
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
          state.isError = false;
        state.products.push(action.payload);
        toast.success("Product has been created");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
          state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
          state.isError = false;
        state.products =(action.payload);
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
          state.isError = false;
        state.userProducts =(action.payload);
      })
      .addCase(getUserProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
          state.isError = false;
          toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product Updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProductByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload
        toast.success("Commission updated successfully");
      })
      .addCase(updateProductByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllSoldProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSoldProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.soldProducts =(action.payload);
        state.message = action.payload;
      })
      .addCase(getAllSoldProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMySoldProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMySoldProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.soldProducts =(action.payload);
        state.message = action.payload;
      })
      .addCase(getMySoldProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getWonedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWonedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wonnedProducts =(action.payload);
        state.message = action.payload;
      })
      .addCase(getWonedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});


export default productSlice.reducer;
