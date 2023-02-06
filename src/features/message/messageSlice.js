import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  error: null,
  messagesById: {},
  currentPageMessage: [],
  totalMessages: 0,
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addMessageSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const {newMessage} = action.payload;
      state.messagesById[newMessage._id] = newMessage;
      state.currentPageMessage.push(newMessage._id);
    },
    resetConversations(state) {
      state.postsById = {};
      state.currentPagePost = [];
    },
    getMessageSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { messages,conversationId } = action.payload;
      state.convId = conversationId
      state.currentPageMessage = []
      console.log("messages", messages);
      messages.forEach((message) => {
        state.messagesById[message._id] = message;
        if (!state.currentPageMessage.includes(message._id))
          state.currentPageMessage.push(message._id);
      });
      state.totalMessages = messages.length;
      // state.conversationId = messages.
    },
  },
});

export const addMessage = (message) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.post("/messages", message);
    dispatch(slice.actions.addMessageSuccess(res.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getMessages =
  ({ conversationId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/messages/${conversationId}`);
      dispatch(slice.actions.getMessageSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
