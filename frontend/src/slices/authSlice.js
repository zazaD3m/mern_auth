import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
}

const authSlice = createSlice({
  // state.auth
  name: "auth",
  initialState,
  reducers: {
    // state.userInfo === state.auth.userInfo
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    clearCredentials: (state, action) => {
      state.userInfo = null
      localStorage.removeItem("userInfo")
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
