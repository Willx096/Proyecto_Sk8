import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import GlobalContext from "../GlobalContext";


const NavUsuario = () => {
  const { username, admin, nombreNav, setShowLogin, logout, setShowRegister, foto  } =
    useContext(GlobalContext);
 

  // console.log(nombre)
  if (!username) {
    return (
      <Navbar  className="px-4" bg="light" variant="light" expand="lg">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar className="px-4" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            
          
              <Nav.Link as={Link} title={nombreNav} className="dropdown-item" to="/perfil">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
                src={"http://localhost:5000/" + foto}
                alt=""
              />
               <div className="userNav"> {nombreNav}</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/eventos" className="dropdown-item">
              Eventos Activos
            </Nav.Link>
              <Nav.Link as={Link} className="dropdown-item" to="/nuevo-evento">
                Nuevo Evento
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
