import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../features/users/userSlice'
import postReducer from '../features/post/postSlice'
import conversationSlice from "../features/conversation/conversationSlice";
import messageSlice from "../features/message/messageSlice";
import bookmarkSlice from "../features/bookmark/bookmarkSlice";
const rootReducer = {
    user: userReducer,
    post: postReducer,
    conversation: conversationSlice,
    message: messageSlice,
    bookmark: bookmarkSlice
}

const store = configureStore({
    reducer: rootReducer

})

export default store