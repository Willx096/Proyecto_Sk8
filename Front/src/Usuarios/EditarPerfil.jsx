import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // const [lafoto, setLafoto] = useState()

  function editarUsuario(e) {
  
    e.preventDefault();
    
    const usuario = {
      nombre,
      descripcion,
      // foto
    };

    const URL = "http://localhost:5000/api/usuarios/1";
    var myHeaders = new Headers();

    // var formData = new FormData();
    // formData.append("nombre", usuario.nombre);
    // formData.append("descripcion", usuario.descripcion);
    // formData.append("foto", usuario.foto)

    var requestOptions = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => {
        response.json()
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => console.log("error", error));

    setNombre("");
    setDescripcion("");
  }




  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Clara" value={nombre}
                onInput={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={3} value={descripcion}
          onInput={(e) => setDescripcion(e.target.value)}/>
          {/* <Form.Text>imatge</Form.Text>
      <Form.Control
        type="file"
        onInput={(e) => setLafoto(e.target.files[0])} /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={editarUsuario}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
