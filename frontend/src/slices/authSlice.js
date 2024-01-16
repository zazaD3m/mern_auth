import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  // state.auth
  name: "auth",
  initialState: { token: null },
  reducers: {
    // state.userInfo === state.auth.userInfo
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    // eslint-disable-next-line no-unused-vars
    clearCredentials: (state, action) => {
      state.token = null
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
