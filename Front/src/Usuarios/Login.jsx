
import { Modal, Form, Button } from "react-bootstrap";

import { useState } from "react";


function Login({show, handleLogin, setShow}) {

    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} onInput={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                    {error ? <span className="error-msg">{error}</span> : <span></span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>handleLogin(email, password)}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Login;
