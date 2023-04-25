import React from "react";

function NavUsuario() {
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
        </Container>
      </Navbar>
    </>
  );
}

export default NavUsuario;
