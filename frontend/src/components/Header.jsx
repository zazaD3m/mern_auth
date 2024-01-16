/* eslint-disable no-undef */
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { useLogoutMutation, useMeMutation } from "../slices/authApiSlice"
import { toast } from "react-toastify"
import { clearUser, selectCurrentUser } from "../slices/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { clearCredentials, selectCurrentToken } from "../slices/authSlice"

const Header = () => {
  const navigate = useNavigate()
  const userInfo = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()

  const [logout] = useLogoutMutation()

  const [getUserInfo] = useMeMutation()

  useEffect(() => {
    if (token && !userInfo) {
      getUserInfo()
    }
    const handleStorageChange = (e) => {
      if (e.key === "persist:root" && e.newValue !== e.oldValue) {
        const storageData = JSON.parse(e.newValue)
        const updatedUserInfo = JSON.parse(storageData.user)
        const updatedToken = JSON.parse(storageData.auth).token
        if (updatedToken && updatedUserInfo) {
          dispatch({
            type: "persist/REHYDRATE",
            key: "root",
            payload: {
              auth: {
                token: updatedToken,
              },
              user: {
                userInfo: updatedUserInfo.userInfo,
              },
              _persist: {
                version: 1,
                rehydrated: true,
              },
            },
          })
        } else {
          dispatch(clearCredentials())
          dispatch(clearUser())
        }
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const logoutHandler = (e) => {
    e.preventDefault()
    logout()
    navigate("/")
    toast.success("logged out")
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/google">
            <Navbar.Brand>GOOOOOOOGLE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
