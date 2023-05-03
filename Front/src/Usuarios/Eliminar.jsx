import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import GlobalContext from "../GlobalContext";

function Eliminar() {
  const { userid, logout } = useContext(GlobalContext);

  //funcion que elimina el usuario de la base de datos
  function eliminarUsuario(e) {
    e.preventDefault();

    const URL = `http://localhost:5000/api/usuarios/${userid}`;

    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => console.log("error", error));
    logout()
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
          <Modal.Title>Eliminar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Atención! Si eliminas el perfil, se eliminará la cuenta
          permanentemente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No quiero eliminar la cuenta.
          </Button>
          <Button variant="primary" onClick={eliminarUsuario}>
            Si, quiero eliminar la cuenta permanentemente.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Eliminar;
