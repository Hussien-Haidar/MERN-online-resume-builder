import { configureStore } from '@reduxjs/toolkit'
import resumeReducer from '../slices/resumeSlice';
import userReducer from '../slices/userSlice';
import contentReducer from '../slices/contentSlice'

export default configureStore({
  reducer: {
    resume: resumeReducer,
    user: userReducer,
    content: contentReducer,
  }
})