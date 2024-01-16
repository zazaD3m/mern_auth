import { apiSlice } from "./apiSlice"
import { clearCredentials, setCredentials } from "./authSlice"
import { clearUser, setUser } from "./userSlice"
const USERS_URL = "/api/users"

// this will inject endpoints into main apiSlice
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          const { accessToken, userInfo } = res.data

          dispatch(setCredentials({ accessToken }))
          dispatch(setUser({ userInfo }))
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(clearCredentials())
          dispatch(clearUser())
          // setTimeout(() => {
          dispatch(apiSlice.util.resetApiState())
          // }, 1000)
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
          dispatch(apiSlice.util.resetApiState())
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          const { accessToken, userInfo } = res.data

          dispatch(setCredentials({ accessToken }))
          dispatch(setUser({ userInfo }))
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
        }
      },
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "PUT",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log("aa")
          const res = await queryFulfilled
          const { userInfo } = res.data
          dispatch(setUser({ userInfo }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    me: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          const { userInfo } = res.data

          dispatch(setUser({ userInfo }))
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/refresh`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
          console.log(err)
        }
      },
    }),
    googleGetUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/google/getuser`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          const { accessToken, userInfo } = res.data

          dispatch(setCredentials({ accessToken }))
          dispatch(setUser({ userInfo }))
        } catch (err) {
          dispatch(clearCredentials())
          dispatch(clearUser())
        }
      },
    }),
    // googleGetUser: builder.query({
    //   query: () => `${USERS_URL}/auth/google/getuser`,
    // }),
    // loginGoogle: builder.query({
    //   query: () => `${USERS_URL}/auth/google`,
    // }),

    // updateProfile: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useMeMutation,
  useUpdateUserMutation,
  useGoogleGetUserMutation,
  // useUpdateProfileMutation,
  // useLoginGoogleQuery,
  // useLazyLoginGoogleQuery,
  // useGoogleGetUserQuery,
} = authApiSlice
