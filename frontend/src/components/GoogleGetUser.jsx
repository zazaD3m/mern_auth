import { useGoogleGetUserMutation } from "../slices/authApiSlice"
import { Navigate } from "react-router-dom"
import { useEffect, useRef } from "react"

const GoogleGetUser = () => {
  const hasMounted = useRef(false)
  const [getUser] = useGoogleGetUserMutation()

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      getUser()
    }
  }, [])

  return <Navigate to="/" />
}
export default GoogleGetUser
