import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  error: null,
  isBookmark: false,
  currentBookmarkPage: [],
  bookmarksById: {},
  totalBookmarks: 0,
};

const slice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      const { currentBookmark } = action.payload;

      currentBookmark.forEach((bookmark) => {
        state.bookmarksById[bookmark._id] = bookmark;
        if (!state.currentBookmarkPage.includes(bookmark._id))
          state.currentBookmarkPage.push(bookmark._id);
      });
    },
    deleteBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const addBookmark =
  ({ productId }) =>
  async (dispatch) => {
    console.log("postId", productId);
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.post("/bookmarks", { postId: productId });
      console.log(res.data.data);
      dispatch(slice.actions.addBookmarkSuccess(res.data));
      toast.success("Add Bookmark Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getBookmark =
  () =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/bookmarks/me`);
      dispatch(slice.actions.getBookmarkSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteBookmark =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.delete(`/bookmarks/${productId}`);
      dispatch(slice.actions.deleteBookmarkSuccess(res.data.data));
      toast.success("Delete Bookmark Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
