import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { Provider } from "react-redux"
import App from "./App.jsx"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import HomeScreen from "./screens/HomeScreen.jsx"
import LoginScreen from "./screens/LoginScreen.jsx"
import RegisterScreen from "./screens/RegisterScreen.jsx"
import ProfileScreen from "./screens/ProfileScreen.jsx"
// import RequireAuth from "./components/RequireAuth.jsx"
import { persistor, store } from "./store.js"
import { PersistGate } from "redux-persist/integration/react"
import Loader from "./components/Loader.jsx"
import RequireAuth from "./components/RequireAuth.jsx"
// import RequireAuth from "./components/RequireAuth.jsx"
// import PrivateRoute from "./components/PrivateRoute.jsx"
import GoogleLogin from "./screens/GoogleLogin.jsx"
import GoogleGetUser from "./components/GoogleGetUser.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />

      <Route path="/google" element={<GoogleLogin />} />
      {/* callback route for google auth */}
      <Route path="/google/getuser" element={<GoogleGetUser />} />

      {/* Private Routes, if there is no userInfo in global state you can't access these routes */}
      <Route element={<RequireAuth />}>
        <Route path="/profile">
          <Route index element={<ProfileScreen />} />
        </Route>
      </Route>
      {/* </Route> */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
