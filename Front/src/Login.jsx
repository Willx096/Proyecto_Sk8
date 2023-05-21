import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Login({ showLogin, iniciaSesion, setShowLogin }) {
  
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [validated, setValidated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("enviant");
    iniciaSesion(email, pswd);
  };

  return (
    <>
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Form onSubmit={onSubmit} validated={validated}>
          <Modal.Header closeButton className="modalStyle">
            <Modal.Title>Inicia sesión para empezar a Skatear!</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce un email válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicpassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder=""
                value={pswd}
                onInput={(e) => setPswd(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Contraseña no válida.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer >
            <Button
              variant="secondary"
              type="submit"
              onClick={() => setValidated(true)}
            >
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
