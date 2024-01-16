// import { apiSlice } from "./apiSlice"
// import { clearCredentials, setCredentials } from "./authSlice"
// const USERS_URL = "/api/users"

// // this will inject endpoints into main apiSlice
// const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     me: builder.query({
//       query: () => `${USERS_URL}/me`,
//     }),
//     // googleGetUser: builder.query({
//     //   query: () => `${USERS_URL}/auth/google/getuser`,
//     // }),
//     // loginGoogle: builder.query({
//     //   query: () => `${USERS_URL}/auth/google`,
//     // }),
//     register: builder.mutation({
//       query: (credentials) => ({
//         url: `${USERS_URL}`,
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: "POST",
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled

//           setTimeout(() => {
//             dispatch(clearCredentials())
//             dispatch(apiSlice.util.resetApiState())
//           }, 1000)
//         } catch (err) {
//           console.log(err)
//         }
//       },
//     }),
//     refresh: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/refresh`,
//         method: "GET",
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled

//           const { accessToken } = data
//           dispatch(setCredentials({ accessToken }))
//         } catch (err) {
//           console.log(err)
//         }
//       },
//     }),
//     // updateProfile: builder.mutation({
//     //   query: (data) => ({
//     //     url: `${USERS_URL}/profile`,
//     //     method: "PUT",
//     //     body: data,
//     //   }),
//     // }),
//   }),
// })

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useRefreshMutation,
//   useMeQuery,
//   // useUpdateProfileMutation,
//   // useLoginGoogleQuery,
//   // useLazyLoginGoogleQuery,
//   // useGoogleGetUserQuery,
// } = usersApiSlice
