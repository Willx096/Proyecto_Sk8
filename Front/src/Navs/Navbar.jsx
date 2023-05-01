import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import GlobalContext from "../GlobalContext";

const NavUsuario = () => {
  const { username, admin, nombreNav, setShowLogin, logout } =
    useContext(GlobalContext);

  // console.log(nombre)
  if (!username) {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sk8tea</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar>
              {/* hacer este tambien con boton de bootstrap o asi */}
              <button className="login" onClick={() => setShowLogin(true)}>
                Iniciar sesion
              </button>
            </Navbar>
            <Navbar>
              <button
                onClick={() =>
                  document.getElementById("registro-id").scrollIntoView()
                }
                className="nav-link"
              >
                Registrarse
              </button>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <NavDropdown
              id="nav-dropdown-dark-example"
              menuVariant="dark"
              title={nombreNav}
            >
              <Link as={Link} className="dropdown-item" to="/perfil">
                Perfil
              </Link>
              <Link className="dropdown-item" to="/nuevo-evento">
                Crear Evento
              </Link>
            </NavDropdown>
            <Nav.Link as={Link} to="/eventos" className="nav-link">
              Eventos
            </Nav.Link>
            {/* Si el usuario es un administrador, mostrar links adicionales (alomejor habria que añadir mas funcionalidades al admin?¿) */}
            {admin ? (
              <>
                <Nav.Link as={Link} to="/lista-usuarios" className="nav-link">
                  Lista de usuarios
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>

        <Button variant="secondary" onClick={logout}>
          Cerrar Sesión
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavUsuario;
