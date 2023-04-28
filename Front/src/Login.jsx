import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Login({showLogin, handleLogin, setShowLogin} ) {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [pswd, setPswd] = useState("")

  return (
    <>
      {/* <button className="login" onClick={handleShow}>
        Login
      </button> */}

      <Modal show={showLogin} onHide={()=>setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onInput={(e) => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicpassword">
              <Form.Label>pswd</Form.Label>
              <Form.Control type="password" placeholder="" value={pswd} onInput={(e) => setPswd(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button> */}
          <Button variant="primary" onClick={()=> handleLogin(email, pswd)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
