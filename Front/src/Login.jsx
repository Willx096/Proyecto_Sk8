import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Login({showLogin, iniciaSesion, setShowLogin} ) {
  
    const [email, setEmail] = useState("")
    const [pswd, setPswd] = useState("")

  return (
    <>
      <Modal show={showLogin} onHide={()=>setShowLogin(false)}>
      
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión para empezar a Skeatear!</Modal.Title>
          {/* la idea aqui es poner algo que no sea tan cutre pero que no se inciiar sesion y ya */}
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onInput={(e) => setEmail(e.target.value)}/>
                                    </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicpassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="" value={pswd} onInput={(e) => setPswd(e.target.value)} />
                   </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={()=>iniciaSesion(email, pswd)}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
       
      </Modal>
    </>
  );
}

export default Login;
