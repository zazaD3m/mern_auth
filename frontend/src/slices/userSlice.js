/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    setUser: (state, action) => {
      const { userInfo } = action.payload
      state.userInfo = userInfo
    },
    clearUser: (state, action) => {
      state.userInfo = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state) => state.user.userInfo
