import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "./authSlice";
import { axiosInstance } from "../../lib/axios";
import type { RootState } from "../store";

interface MessageState {
  user: User | null;
  onlineUserIds: string[] | null; // from socket
  allUsers: User[] | null; // from API
  isOnlineUsersLoading: boolean;
  isMessageLoading: boolean;
  selectedUsers: User[] | null;
  error: string | null;
}

const initialState: MessageState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  onlineUserIds: null,
  allUsers: null,
  isOnlineUsersLoading: false,
  isMessageLoading: false,
  selectedUsers: null,
  error: null,
};

export const getOnlineUsers = createAsyncThunk(
  "messages/users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/messages/users");
      return res.data.filteredUsers;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response.data.message || "Error Getting Online Users";
      return rejectWithValue(msg);
    }
  }
);

/// fetching the messages api
// do this after doing the send messages
export const getMessages = createAsyncThunk(
  "/messages/:id",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/messages/:id");
      return res.data.messages;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.messsage)
        ? err.response.data.message.join(", ")
        : err.response.data.message || "Error getting Messages";
      return rejectWithValue(msg);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setOnlineUserIds: (state, action: PayloadAction<string[]>) => {
      state.onlineUserIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOnlineUsers.pending, (state) => {
        state.isOnlineUsersLoading = true;
        state.error = null;
      })
      .addCase(getOnlineUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isOnlineUsersLoading = false;
      })
      .addCase(getOnlineUsers.rejected, (state, action) => {
        state.isOnlineUsersLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setOnlineUserIds } = messageSlice.actions;
export const messageRequests = (state: RootState) => state.message;
export default messageSlice.reducer;
