import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../slices/authSlice"

const PrivateRoute = () => {
  const location = useLocation()
  const token = useSelector(selectCurrentToken)

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
export default PrivateRoute
