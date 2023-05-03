import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GlobalContext from "../GlobalContext";

function FotosEvento({ eventoid }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userid, token } = useContext(GlobalContext);

  const [foto, setFoto] = useState();

  function SubirFoto(e) {

    e.preventDefault();

    const usuario = {
      id_usuario: userid,
      id_evento: eventoid,
      foto,
    };
    
    var formData = new FormData();
    formData.append("id_usuario", usuario.id_usuario);
    formData.append("id_evento", usuario.id_evento);
    formData.append("file", usuario.foto);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/participacion/subir-fotos",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setShow(false);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Valorar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valoración del evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onInput={(e) => setFoto(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={SubirFoto}>
            Valorar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FotosEvento;
