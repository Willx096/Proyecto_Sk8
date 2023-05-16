import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import GlobalContext from "../GlobalContext";

function Editar({ perfil, refresh, setRefresh }) {
  const { userid } = useContext(GlobalContext);
  const formularioOk = () => toast.success("Usuario editado!");
  const formularioBad = () => toast.error("Usuario no editado");
  //validaciones
  const [validated, setValidated] = useState(false);

  //para mostrar o no el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState(perfil.nombre);
  const [apellido, setApellido] = useState(perfil.apellido);
  const [email, setEmail] = useState(perfil.email);
  const [fecha, setFecha] = useState(perfil.fecha_nacimiento);
  const [nivel, setNivel] = useState(perfil.nivel);
  const [experiencia, setExperiencia] = useState(perfil.experiencia);
  const [lafoto, setLafoto] = useState();
  const [descripcion, setDescripcion] = useState(perfil.descripcion);
  const [nickname, setNickname] = useState(perfil.nickname);
  const [contacto, setContacto] = useState(perfil.contacto);

  const usuario = {
    nombre,
    apellido,
    email,
    fecha,
    nivel,
    experiencia,
    lafoto,
    descripcion,
    nickname,
    contacto,
  };

  //funcion que modifica los datos de la base de datos
  function editarUsuario(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      formularioBad();
      return;
    }

    const URL = `http://localhost:5000/api/usuarios/${userid}`;

    var formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("fecha", usuario.fecha);
    formData.append("nivel", usuario.nivel);

    formData.append("experiencia", usuario.experiencia);
    formData.append("file", usuario.lafoto);
    formData.append("descripcion", usuario.descripcion);
    formData.append("nickname", usuario.nickname);
    formData.append("contacto", usuario.contacto);

    var requestOptions = {
      method: "PUT",
      body: formData,
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setRefresh(refresh + 1);
        setShow(false);
        setValidated(false);
        formularioOk();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose} className="modals">
        <Form noValidate validated={validated} onSubmit={editarUsuario}>
          <Modal.Header className="tituloModal" closeButton>
            <Modal.Title>Editar datos del perfil</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bodyModal">
            <Row xs={1} sm={2} md={2}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  value={nombre}
                  onInput={(e) => setNombre(e.target.value)}
                  type="text"
                />

                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  required
                  value={apellido}
                  onInput={(e) => setApellido(e.target.value)}
                  type="text"
                />

                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustomUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={nickname}
                  onInput={(e) => setNickname(e.target.value)}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  type="email"
                />

                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nivel</Form.Label>
                <Form.Select
                  required
                  value={nivel}
                  onInput={(e) => setNivel(e.target.value)}
                  type="text"
                >
                  <option>Empezando</option>
                  <option>Principiante</option>
                  <option>Casual</option>
                  <option>Pro</option>
                  <option>Tony Hawk</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experiencia</Form.Label>
                <Form.Select
                  required
                  value={experiencia}
                  onInput={(e) => setExperiencia(e.target.value)}
                  type="text"
                >
                  <option>Menos de un mes</option>
                  <option>Unos meses</option>
                  <option>1 año</option>
                  <option>Más de 1 año</option>
                  <option>Muchos años</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Contacto</Form.Label>
                <Form.Control
                  value={contacto}
                  onInput={(e) => setContacto(e.target.value)}
                  type="text"
                />
                <br />
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control
                  type="file"
                  onInput={(e) => setLafoto(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  rows={6}
                  as="textarea"
                  type="textarea"
                  value={descripcion}
                  onInput={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>

          <Modal.Footer className="tituloModal">
            <Button variant="outline-danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="outline-secondary" type="submit">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Editar;
