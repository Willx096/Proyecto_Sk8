import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";
import "./App.css";

function App() {
  return (
    <>
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
          <Nav>
            <span
              className="nav-link"
              onClick={() =>
                document.getElementById("registro-id").scrollIntoView()
              }
            >
              Registro
            </span>
          </Nav>
          {/* <Link as={Link} to="#registro" className="nav-link text-white">
            Registro
          </Link> */}
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
