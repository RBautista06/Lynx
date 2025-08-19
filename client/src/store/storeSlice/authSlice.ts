import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import type { RootState } from "../store";

export interface User {
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
  checked: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
  checked: false,
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
      return res.data.user;
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
    credentials: { emailOrUsername: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data.user;
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
      const res = await axiosInstance.get("/auth/check-auth");
      return res.data.user;
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        return rejectWithValue("Unauthorized");
      }
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
    userProfile: { fullName: string; profilePic: string; bio: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.patch(
        "/auth/profile/update-profile",
        userProfile
      );
      return res.data.user;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Error updating profile";
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
      })

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

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.checked = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.checked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          state.user = null;
        }
        state.isLoading = false;
        state.checked = true;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.error("Update profile failed:", action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const userAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
