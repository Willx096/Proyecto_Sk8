import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//demomento solo lo usamos para el id
import GlobalContext from "../GlobalContext";

function Eliminar() {
  // const { id } = useContext(GlobalContext);

  //nos permite tener una funcion que al ejecutarse nos envie a la pagina de inicio
  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo("/");
  };
//funcion que elimina el usuario de la base de datos
  function eliminarUsuario(e) {
    e.preventDefault();

    const URL = `http://localhost:5000/api/usuarios/2`;

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

    //nos lleva al inicio despues de eliminar la cuenta
    goHome();
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            no quiero
          </Button>
          <Button variant="primary" onClick={eliminarUsuario}>
            si, quiero Eliminar cuenta permanentemente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Eliminar;
