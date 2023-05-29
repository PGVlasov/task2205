import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { SetUserIsLoggedOut } from '../../services/store/reducers/auth/actionCreator';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const NavbarComponent = () => {
  const { isAuth } = useSelector((state) => state.authReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.clear()
    dispatch(SetUserIsLoggedOut())
    navigate("/")
  }
  if (!isAuth) return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Auth</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
  return (
    <>
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/people">People</Nav.Link>
            <Nav.Link as={Link} to="/accaunt">Accaunt</Nav.Link>
          </Nav>
          <Button onClick={logout}>Logout</Button>
        </Container>
      </Navbar>
    </>
  );
}
