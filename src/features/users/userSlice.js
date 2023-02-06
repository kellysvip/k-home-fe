import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUploadAvatar } from "../../utils/cloudinaryAvt";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const allUsers = action.payload;
      state.allUsers = allUsers
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({
    userId,
    name,
    phoneNumber,
    avatarUrl,
    password,
    aboutMe,
    jobTitle,
    facebookLink,
    instagramLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        avatarUrl,
        phoneNumber,
        password,
        aboutMe,
        jobTitle,
        facebookLink,
        instagramLink,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUploadAvatar(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/all");
    dispatch(slice.actions.getAllUsersSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
