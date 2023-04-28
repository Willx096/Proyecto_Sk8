import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import Login from "../Login"

function NavUsuario() {

const {username, setMostrarLogin, logout} = useContext(GlobalContext)

  if (username) {
    <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sk8tea</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar>
            <button
                className="nav-link cursor-pointer"
                onClick={() => setMostrarLogin(true)}
              >
        
              </button> 
            </Navbar>
            <Navbar>
              <div
                onClick={() =>
                  document.getElementById("registro-id").scrollIntoView()
                }
                className="nav-link"
              >
                Registro
              </div>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    
  }
  return (
    
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/eventos" className="nav-link">
                Eventos
              </Nav.Link>
              <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
                title="Usuarios"
              >
                <Nav.Link as={Link} className="dropdown-item" to="/perfil">
                  Perfil
                </Nav.Link>
                <Link className="dropdown-item" to="/nuevo-evento">
                  Crear Evento
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <button
                className="nav-link cursor-pointer"
                onClick={() => setMostrarLogin(true)}
              >
        
              </button> 
          <button className='nav-link cursor-pointer' onClick={logout}>Logout</button>
        </Container>
      </Navbar>
   
  );
}

export default NavUsuario;
