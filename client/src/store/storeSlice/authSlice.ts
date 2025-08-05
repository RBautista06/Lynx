import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../lib/axios";
import type { RootState } from "../store";

interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  gender?: string;
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

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      emailOrUsername: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      const user = res.data.user;
      return user;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("auth/check-auth");
      return res.data.user;
    } catch (err: any) {
      const status = err.response?.status;
      // Only reject if token is invalid/expired
      if (status === 401 || status === 403) {
        return rejectWithValue("Unauthorized");
      }
      // Otherwise, don't wipe auth – just log or handle
      console.warn("checkAuth failed:", err);
      return rejectWithValue(
        "Something went wrong, but you're still logged in"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (
    userProfile: {
      fullName: string;
      profilePic: string;
      bio: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.patch(
        "auth/profile/update-profile",
        userProfile
      );
      const updatedUser = res.data.user;
      return updatedUser;
    } catch (error: any) {
      const msg = Array.isArray(error.response?.data?.message)
        ? error.response.data.message.join(", ")
        : error.response?.data?.message || "Error updating profile";
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
      // signup
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
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      //checkauth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        // i decided to hide the error in the user but if i want this will show
        // state.error = action.payload as string;
        if (action.payload === "Unauthorized") {
          state.user = null;
        }
        state.isLoading = false;
      })
      /// uploadProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const userAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
