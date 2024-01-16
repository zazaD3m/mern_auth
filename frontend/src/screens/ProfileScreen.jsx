import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { Button, Form } from "react-bootstrap"
import { selectCurrentUser } from "../slices/userSlice"
import { useUpdateUserMutation } from "../slices/authApiSlice"

const ProfileScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const userInfo = useSelector(selectCurrentUser)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name)
      setEmail(userInfo?.email)
    } else {
      setName("")
      setEmail("")
    }
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    await updateUser({ name, email }).unwrap()

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match")
    // } else {
    //   try {
    //     toast.success("user updated")
    //     // navigate("/")
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error)
    //   }
    // }
  }

  return (
    <FormContainer>
      <h1>Update Profile</h1>
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

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  )
}
export default ProfileScreen
