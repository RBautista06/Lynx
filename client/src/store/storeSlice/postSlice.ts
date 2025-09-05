import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PostProp } from "../../component/propTypes/postTypes";
import type { RootState } from "../store";

interface PostsSlice {
  posts: PostProp[] | null;
  isGetPostLoading: boolean;
  error: string | null;
}

const initialState: PostsSlice = {
  posts: null,
  isGetPostLoading: false,
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
  },
});

export const postRoute = (state: RootState) => state.posts;
export default postSlice.reducer;
