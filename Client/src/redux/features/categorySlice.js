import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  category: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// create category
export const createCategory = createAsyncThunk(
    "category/create",
    async (FormData, thunkApi) => {
      try {
        const response = await categoryService.createCategory(FormData);
        return response; 
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );

  export const getAllCategory = createAsyncThunk(
    "category/get-all",
    async (_, thunkApi) => {
      try {
        const response = await categoryService.getAllCategory();
        return response.data; 
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);
  
export const getCategoryById = createAsyncThunk(
  "category/get-category-by-id",
  async (categoryId, thunkApi) => {
    try {
      const response = await categoryService.getCategoryById(categoryId);
      return response.data; 
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


  // update category
  export const updateCategory = createAsyncThunk(
    "category/update",
    async ({id, formData}, thunkApi) => {
      try {
        const response = await categoryService.updateCategory(id, formData);
        return response; 
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );

  
// delete category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId, thunkApi) => {
    try {
      await categoryService.deleteCategory(categoryId); 
      return categoryId; 
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Category has been created");
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(updateCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Category has been updated");
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.isLoading = false; 
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(getAllCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.categories = action.payload;
        })
        .addCase(getAllCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getCategoryById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCategoryById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.category = action.payload;
        })
        .addCase(getCategoryById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(deleteCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Category has been deleted");
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        });
  }
});

export default categorySlice.reducer;
