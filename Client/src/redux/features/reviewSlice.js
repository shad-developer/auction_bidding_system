import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "../services/reviewService";
import { toast } from "react-toastify";

const initialState = {
  reviews: [],
  review: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// create review
export const createReview = createAsyncThunk(
    "review/create",
    async (formData, thunkApi) => {
        try {
        const response = await reviewService.createReview(formData);
        return response; 
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );


  export const getAllReviewsByProductId = createAsyncThunk(
    "reviews/get-all",
    async (productId, thunkApi) => {
      try {
        const response = await reviewService.getAllReviewsByProductId(productId);
        return response.data; 
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
);
  
// export const getCategoryById = createAsyncThunk(
//   "category/get-category-by-id",
//   async (categoryId, thunkApi) => {
//     try {
//       const response = await categoryService.getCategoryById(categoryId);
//       return response.data; 
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || error.toString();
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );


//   // update category
//   export const updateCategory = createAsyncThunk(
//     "category/update",
//     async ({id, formData}, thunkApi) => {
//       try {
//         const response = await categoryService.updateCategory(id, formData);
//         return response; 
//       } catch (error) {
//         const message = error.response?.data?.message || error.message || error.toString();
//         return thunkApi.rejectWithValue(message);
//       }
//     }
//   );

  
// // delete category
// export const deleteCategory = createAsyncThunk(
//   "category/delete",
//   async (categoryId, thunkApi) => {
//     try {
//       await categoryService.deleteCategory(categoryId); 
//       return categoryId; 
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || error.toString();
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );


const reviewSlice = createSlice({
  name: "review",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createReview.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createReview.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Review has been created");
        })
        .addCase(createReview.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        // .addCase(updateCategory.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(updateCategory.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.isError = false;
        //   toast.success("Category has been updated");
        // })
        // .addCase(updateCategory.rejected, (state, action) => {
        //   state.isLoading = false; 
        //   state.isError = true;
        //   state.message = action.payload;
        //   toast.error(action.payload);
        // })
        .addCase(getAllReviewsByProductId.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllReviewsByProductId.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.reviews = action.payload;
        })
        .addCase(getAllReviewsByProductId.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        // .addCase(getCategoryById.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(getCategoryById.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.isError = false;
        //   state.category = action.payload;
        // })
        // .addCase(getCategoryById.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.message = action.payload;
        // })
        // .addCase(deleteCategory.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(deleteCategory.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.isError = false;
        //   toast.success("Category has been deleted");
        // })
        // .addCase(deleteCategory.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.message = action.payload;
        //   toast.error(action.payload);
        // });
  }
});

export default reviewSlice.reducer;
