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
  const [apellido, setApellido] = useState(perfil.apellido);
  const [email, setEmail] = useState(perfil.email);
  const [fecha, setFecha] = useState(perfil.fecha_nacimiento);
  const [nivel, setNivel] = useState(perfil.nivel);
  const [pswd, setPswd] = useState(perfil.pswd);
  const [experiencia, setExperiencia] = useState(perfil.experiencia);
  const [lafoto, setLafoto] = useState();
  const [descripcion, setDescripcion] = useState(perfil.descripcion);
  const [nickname, setNickname] = useState(perfil.nickname);
  const [contacto, setContacto] = useState(perfil.contacto);

  useEffect(() => {
    if (perfil) {
      setNombre(perfil.nombre);
      setDescripcion(perfil.descripcion);
    }
  }, [perfil]);

  //funcion que modifica los datos de la base de datos
  function editarUsuario(e) {
    e.preventDefault();

    const usuario = {
      nombre,
      apellido,
      email,
      fecha,
      nivel,
      pswd,
      experiencia,
      lafoto,
      descripcion,
      nickname,
      contacto,
    };

    const URL = `http://localhost:5000/api/usuarios/${id}`;

    var formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("fecha", usuario.fecha);
    formData.append("nivel", usuario.nivel);
    formData.append("pswd", usuario.pswd);
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
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onInput={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onInput={(e) => setApellido(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                type="email"
              />
                                   </Form.Group>
            <Form.Group >
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                value={nickname}
                onInput={(e) => setNickname(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group >
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={fecha}
                onInput={(e) => setFecha(e.target.value)}
                type="date"
              />
            </Form.Group>
            <Form.Group >
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
            <Form.Group >
              <Form.Label>Tiempo patinando</Form.Label>
              <Form.Select
                required
                value={experiencia}
                onInput={(e) => setUsuario(e.target.value)}
                type="text"
              >
                <option>Menos de un mes</option>
                <option>Unos mese</option>
                <option>1 año</option>
                <option>Más de 1 año</option>
                <option>Muchos años</option>
              </Form.Select>
                          </Form.Group>
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={pswd}
                onInput={(e) => setPswd(e.target.value)}
                type="password"
              />
                        <Form.Control.Feedback type="invalid">
                Introduce una contraseña.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Contacto</Form.Label>
              <Form.Control
                value={contacto}
                onInput={(e) => setContacto(e.target.value)}
                type="txt"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="textarea"
                value={descripcion}
                onInput={(e) => setDescripcion(e.target.value)}
              />
              <Form.Text>Imagen</Form.Text>
              <Form.Control
                type="file"
                onInput={(e) => setLafoto(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
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