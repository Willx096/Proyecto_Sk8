import React, { useState, useContext } from "react";
import { Button, Modal, Row } from "react-bootstrap";


function EliminarEvento({participacionId, eventoId, refresh, setRefresh}) {


  //funcion que elimina el usuario de la base de datos
  function eliminarEvento(e) {
    e.preventDefault();

    const URL = `http://localhost:5000/api/eventos/${eventoId}`;

    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Eliminado",data);
        setRefresh(refresh + 1);
        setShow(false);
      })
      .catch((error) => console.log("error", error));
    
  }

  //para mostrar o no el mensaje que confirma que se quiere eliminar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModal">
        Atención! Si eliminas el evento, se <b>eliminará permanentemente</b>.
        </Modal.Body>
        <Modal.Footer>
        <Row xs={12} sm={12} md={12}>
          <Button variant="secondary" onClick={handleClose}>
            No quiero eliminar la cuenta.
          </Button>
          <Button variant="danger" onClick={eliminarEvento}>
            Eliminar el evento permanentemente.
          </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EliminarEvento;
