import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  error: null,
  senderId: "",
  receiverId: "",
  totalConversations: 0,
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createConversationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { newConversation } = action.payload;
      state.conversation = newConversation;
      state.convInfo = {
        conversationId: newConversation._id,
        senderId: newConversation.members[0],
        receiverId: newConversation.members[1],
      }
    },
    resetConversations(state) {
      state.postsById = {};
      state.currentPagePost = [];
    },
    getConversationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { conversation } = action.payload;
      state.conversation = conversation[0]
      state.senderId = conversation[0].members[0]
      state.receiverId = conversation[0].members[1]
    },
  },
});

export const createConversation =
  ( {members} ) =>
  async (dispatch) => {
    console.log("members", members);
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.post("/conversations",  members);
      dispatch(slice.actions.createConversationSuccess(res.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getConversations =
  ({ userId, ownPostId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log("userId, ownPostId", userId, ownPostId  );
    try {
      const response = await apiService.get(`/conversations/${userId}?ownPostId=${ownPostId}`);
      console.log("response in conv", response.data.data); 
      dispatch(slice.actions.getConversationSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
