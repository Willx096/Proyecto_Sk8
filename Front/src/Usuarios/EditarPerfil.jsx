import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

//solo id
import GlobalContext from "../GlobalContext";

function Editar({ perfil, refresh, setRefresh }) {
  const { id } = useContext(GlobalContext);

  //para mostrar o no el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState(perfil.nombre);
  const [lafoto, setLafoto] = useState();

  useEffect(() => {
    if (perfil) {
      setNombre(perfil.nombre);
    }
  }, [perfil]);

  //funcion que modifica los datos de la base de datos
  function editarUsuario(e) {
    e.preventDefault();

    const usuario = {
      nombre,
      // descripcion,
      lafoto,
    };

    const URL = `http://localhost:5000/api/usuarios/${id}`;

    var formData = new FormData();
    formData.append("nombre", usuario.nombre);
    // formData.append("descripcion", usuario.descripcion);
    formData.append("file", usuario.lafoto);

    var requestOptions = {
      method: "PUT",
      body: formData,
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setRefresh(refresh+1)
        setShow(false)
      })
      .catch((error) => console.log("error", error));

    setNombre("");
    // setDescripcion("");
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
                placeholder=""
                value={nombre}
                onInput={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              {/* <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={3} value={descripcion}
          onInput={(e) => setDescripcion(e.target.value)}/> */}
              <Form.Text>imatge</Form.Text>
              <Form.Control
                type="file"
                onInput={(e) => setLafoto(e.target.files[0])}
              />
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

export default Editar;
