import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import { apiSlice } from "./apiSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export default rootReducer
