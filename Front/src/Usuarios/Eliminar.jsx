import React, { useState, useContext } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { API_URL, IMG_URL  } from "../apiConfig";

function Eliminar() {
  const { userid, logout } = useContext(GlobalContext);

  //funcion que elimina el usuario de la base de datos
  function eliminarUsuario(e) {
    e.preventDefault();

    const URL = API_URL+`usuarios/${userid}`;

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
    logout();
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
          <Modal.Title>Eliminar cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModal">
          Atención! Si eliminas el perfil, se <b>eliminará</b> la cuenta
          <b> permanentemente</b>.
        </Modal.Body>
        <Modal.Footer>
          <Row xs={12} sm={12} md={12}>
            <Button variant="secondary" onClick={handleClose}>
              No quiero eliminar la cuenta.
            </Button>
            <Button variant="danger" onClick={eliminarUsuario}>
              Eliminar la cuenta permanentemente.
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Eliminar;
