import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavInicio() {
  const [click, setClick] = useState(false);
  const handelClick = () => setClick(!click);

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sk8tea</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar>
              <div className="nav-link separa">Login</div>
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
    </>
  );
}

export default NavInicio;
