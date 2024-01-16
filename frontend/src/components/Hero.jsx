import { Button, Card, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useMeMutation } from "../slices/authApiSlice"

const Hero = () => {
  const [getUserInfo, { error }] = useMeMutation()

  const handleClick = (e) => {
    e.preventDefault()
    getUserInfo()
  }
  if (error) {
    console.log(error)
  }
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" href="/login" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary" href="/register">
                Sign Up
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
      <Button variant="secondary" onClick={handleClick}>
        GGGet
      </Button>
    </div>
  )
}
export default Hero
