import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./storeSlice/authSlice";
import messageReducer from "./storeSlice/messageSlice";
import postReducer from "./storeSlice/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
