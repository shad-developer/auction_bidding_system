import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import categoryReducer from "./features/categorySlice";
import productReducer from "./features/productSlice";
import bidReducer from "./features/biddingSlice";
import reviewReducer from "./features/reviewSlice";
import messageReducer from './features/messageSlice';

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    category: categoryReducer,
    product: productReducer,
    bidding: bidReducer,
    review: reviewReducer,
    message: messageReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  }),
});

export const persistor = persistStore(store);
