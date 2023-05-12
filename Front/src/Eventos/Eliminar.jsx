import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";


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
      <Button variant="primary" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Atención! Si eliminas el evento, se eliminará la evento
          permanentemente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No quiero eliminar la cuenta.
          </Button>
          <Button variant="primary" onClick={eliminarEvento}>
            Si, quiero eliminar el evento permanentemente.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EliminarEvento;
