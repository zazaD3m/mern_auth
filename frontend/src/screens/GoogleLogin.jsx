import { Link } from "react-router-dom"

const GoogleLogin = () => {
  return (
    <div>
      <Link to={`/api/users/auth/google`}>SIGN IN GOOGLE</Link>
    </div>
  )
}
export default GoogleLogin
