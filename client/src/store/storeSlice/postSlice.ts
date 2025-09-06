import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PostProp } from "../../component/propTypes/postTypes";
import type { RootState } from "../store";

interface PostsSlice {
  posts: PostProp[] | null;
  isGetPostLoading: boolean;
  isUploadLoading: boolean;
  error: string | null;
}

const initialState: PostsSlice = {
  posts: null,
  isGetPostLoading: false,
  isUploadLoading: false,
  error: null,
};

export const getPosts = createAsyncThunk(
  "post/getpost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/post/getpost");
      return res.data.posts;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Error fetching posts";
      return rejectWithValue(msg);
    }
  }
);

export const uploadPost = createAsyncThunk(
  "post/upload",
  async (
    post: {
      caption: string;
      media: string[];
      privacy: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/post/upload", post);
      return res.data.post;
    } catch (err: any) {
      const msg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Upload failed";
      return rejectWithValue(msg);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, _) => {
      state.isGetPostLoading = true;
      state.error = null;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isGetPostLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isGetPostLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(uploadPost.pending, (state, _) => {
      state.isUploadLoading = true;
      state.error = null;
    });
    builder.addCase(uploadPost.fulfilled, (state, action) => {
      state.isUploadLoading = false;

      if (state.posts) {
        state.posts = [action.payload, ...state.posts]; // prepend new post
      } else {
        state.posts = [action.payload]; // initialize if null
      }
    });
    builder.addCase(uploadPost.rejected, (state, action) => {
      state.isUploadLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const postRoute = (state: RootState) => state.posts;
export default postSlice.reducer;
