import { Link } from "react-router-dom"

const googleURL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL_PROD
    : process.env.API_URL_DEV

const GoogleLogin = () => {
  return (
    <div>
      <Link to={`${googleURL}/api/users/auth/google`}>SIGN IN GOOGLE</Link>
    </div>
  )
}
export default GoogleLogin
