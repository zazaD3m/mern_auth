import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../slices/authApiSlice"

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const [register, { isLoading, isError, error }] = useRegisterMutation()

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError, error])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        await register({ name, email, password }).unwrap()

        toast.success(`Welcome, ${name}`)
        navigate("/")
      } catch (err) {
        toast.error(err)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default RegisterScreen
