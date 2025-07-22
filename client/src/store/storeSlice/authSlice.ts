import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../lib/axios";
import type { RootState } from "../store";

interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    newUser: {
      fullName: string;
      username: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/auth/signup", newUser);
      const user = res.data.user;
      // localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Signup failed";
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const userAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
