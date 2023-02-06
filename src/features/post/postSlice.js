import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
const POST_PER_PAGE = 10;
const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePost: [],
  totalPostsOfUser: 0,
  totalPosts: 0,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePost.length % POST_PER_PAGE === 0)
        state.currentPagePost.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePost.unshift(newPost._id);
    },
    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const postId = action.payload;
      state.postsById[postId].delete = null;
    },
    resetPosts(state) {
      state.postsById = {};
      state.currentPagePost = [];
    },
    changePostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { countPosts, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePost.includes(post._id))
          state.currentPagePost.push(post._id);
      });
      state.totalPosts = countPosts;
    },
    getAllPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { countPostOfUser, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePost.includes(post._id))
          state.currentPagePost.push(post._id);
      });
      state.totalPostsOfUser = countPostOfUser;
    },
    getSinglePost(state, action) {
      state.isLoading = false;
      state.error = null;
      const { post } = action.payload;
      state.products = post;
    },

    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
  },
});

export const createPost =
  ({
    title,
    image,
    address,
    price,
    noBedroom,
    noBathroom,
    area,
    description,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(image);
      const imageUrl = await cloudinaryUpload(image);
      const res = await apiService.post("/posts", {
        title,
        address,
        price,
        noBedroom,
        noBathroom,
        area,
        description,
        imageUrl: imageUrl,
        status: "available",
        isDeleted: false,
      });
      dispatch(slice.actions.createPostSuccess(res.data.data.post));
      toast.success("Create Post Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deletePost =
  ({ postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.delete(`/posts/${postId}`);
      dispatch(slice.actions.deletePostSuccess(res.data.data.post));
      toast.success("Delete Post Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const changePost =
  (
    postId,
    {
      title,
      image,
      status,
      address,
      price,
      noBedroom,
      noBathroom,
      area,
      description,
    }
  ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const res = await apiService.put(`/posts/${postId}`, {
        title,
        imageUrl: imageUrl,
        status,
        address,
        price,
        noBedroom,
        noBathroom,
        area,
        description,
      });
      console.log(res.data);
      toast.success("Change Post Success");
      dispatch(slice.actions.changePostSuccess(res.data.data.post));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getPosts =
  ({ filters, page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/posts?page=${page}&limit=${limit}`;
      url += filters.searchQuery ? `&title=${filters.searchQuery}` : "";
      url += filters.address ? `&address=${filters.address}` : "";
      const response = await apiService.get(url);
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSinglePost =
  ({ _id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/posts/${_id}`;
      const response = await apiService.get(url);
      dispatch(slice.actions.getSinglePost(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPostsOfUser =
  ({ userId, page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/posts/user/${userId}?page=${page}&limit=${limit}`;
      const response = await apiService.get(url);
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getAllPostSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

// export const sendPostReaction =
//   ({ postId, emoji }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await apiService.post(`/reactions`, {
//         targetType: "Post",
//         targetId: postId,
//         emoji,
//       });
//       dispatch(
//         slice.actions.sendPostReactionSuccess({
//           postId,
//           reactions: response.data,
//         })
//       );
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

export default slice.reducer;
