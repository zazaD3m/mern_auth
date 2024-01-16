import { useState } from "react"
import FormContainer from "../components/FormContainer"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLoginMutation } from "../slices/authApiSlice"
import { selectCurrentToken } from "../slices/authSlice"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { selectCurrentUser } from "../slices/userSlice"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let location = useLocation()
  location = location.state?.from?.pathname
  // get login function from usersApiSlice to fire up fetch request
  const [login, { isLoading, isSuccess, isUninitialized }] = useLoginMutation()

  // get token from redux global state
  const token = useSelector(selectCurrentToken)
  const userInfo = useSelector(selectCurrentUser)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      // fire up POST fetch request named login in usersApiSlice endpoint
      // navigate("/")
      await login({ email, password }).unwrap()

      // update global state userInfo with data that came back from db
      // also add userInfo to localStorage
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  let content

  if (isUninitialized && !token) {
    content = (
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    )
  } else if (isLoading) {
    content = <Loader />
  } else if (isSuccess) {
    toast.success(`Welcome, ${userInfo.name}`)
    content = <Navigate to={`${location ? location : "/"}`} replace />
  } else {
    content = <Navigate to={`${location ? location : "/"}`} replace />
  }

  return content
}
export default LoginScreen
