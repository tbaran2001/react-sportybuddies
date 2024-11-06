import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider';
import { getGravatarUrl } from '../../utils/gravatar';

export default function Header() {
  const { user, logout } = useUser();
  const gravatarUrl = user ? getGravatarUrl(user.email,32) : undefined;

  return (
    <Navbar bg="light" sticky="top" className="Header">
      <Container>
        <Navbar.Brand>Sportybuddies</Navbar.Brand>
        <Nav>
          {user === undefined ?
            <Spinner animation="border" />
          :
            <>
              {user !== null &&
                <div className="justify-content-end">
                  <NavDropdown title={
                    <Image src={gravatarUrl} roundedCircle />
                  } align="end">
                    <NavDropdown.Item as={NavLink} to={'/user/' + user.id}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              }
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}