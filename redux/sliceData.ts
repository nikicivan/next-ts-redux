import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import axios from 'axios';

export type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsState = {
  posts: Array<Posts>;
  loading: boolean;
  error?: string;
};

export const postsReducer = createSlice({
  name: "posts",
  initialState: {} as PostsState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = undefined;
    },
    success(state, action: PayloadAction<Posts[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    fail(state) {
      state.loading = false;
      state.error = "Unable to fetch posts";
    }
  }
});

export default postsReducer.reducer;

export const getAllPosts = (): AppThunk => async dispatch => {
  try {
    dispatch(postsReducer.actions.request());
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch(postsReducer.actions.success(data));
  } catch (err) {
    dispatch(postsReducer.actions.fail());
  }
};
