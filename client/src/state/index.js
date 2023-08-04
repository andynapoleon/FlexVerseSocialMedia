import { createSlice } from "@reduxjs/toolkit";

// this is basically a global store (or state) that all components can use
// if we wanna grab anything from the store, just use function useSelector from redux
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  userFriends: [],
  rows: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts; // state of posts being displayed on screen at a specific time
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUserFriends: (state, action) => {
      state.userFriends = action.payload.userFriends;
    },
    setRows: (state, action) => {
      state.rows = action.payload.rows;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUserFriends,
  setRows,
} = authSlice.actions;
export default authSlice.reducer;
