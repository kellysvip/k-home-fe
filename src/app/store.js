import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../features/users/userSlice'
import postReducer from '../features/post/postSlice'
const rootReducer = {
    user: userReducer,
    post: postReducer
}

const store = configureStore({
    reducer: rootReducer

})

export default store