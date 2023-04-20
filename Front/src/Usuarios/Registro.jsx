import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container, InputGroup } from "react-bootstrap";

function Registro(props) {
  //Validate para validar que los campos se han rellenado
  const [validated, setValidated] = useState(false);
  //Creamos este state clave refrescar el valor de la foto
  const [clave, setClave] = useState(0);
  //State con array de objetos de usuario para no hacer mucho states
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nivel: "Empezando",
    fecha_nacimiento: "",
    pswd: "",
    experiencia: 0,
    foto: null,
    descripcion: "",
    nickname: "",
    contacto: null,
  });

  function CrearUsuario(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("nivel", usuario.nivel);
    formData.append("fecha_nacimiento", usuario.fecha_nacimiento);
    formData.append("pswd", usuario.pswd);
    formData.append("experiencia", usuario.experiencia);
    formData.append("file", usuario.foto);
    formData.append("descripcion", usuario.descripcion);
    formData.append("nickname", usuario.nickname);
    formData.append("contacto", usuario.contacto);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/usuarios", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        setUsuario({
          nombre: "",
          apellido: "",
          email: "",
          nivel: "",
          fecha_nacimiento: "",
          pswd: "",
          experiencia: 0,
          foto: null,
          descripcion: "",
          nickname: "",
          contacto: null,
        });
        //cambiamos el valor de clave a 1
        setClave(clave + 1);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Container className="d-grid h-100">
      <Form
        noValidate
        validated={validated}
        className="text-center"
        onSubmit={CrearUsuario}
      >
        <Row md={3}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              value={usuario.nombre}
              onInput={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              type="txt"
              placeholder="Franzisco"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un nombre.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              required
              value={usuario.apellido}
              onInput={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
              type="txt"
              placeholder="Perez"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un Apellido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustomUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              value={usuario.nickname}
              onInput={(e) => setUsuario({ ...usuario, nickname: e.target.value })}
              type="txt"
              placeholder="Fran34"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Elige un nombre de usuario.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              value={usuario.email}
              onInput={(e) => setUsuario({ ...usuario, email: e.target.value })}
              type="email"
              placeholder="email@gmail.com"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un emial.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              required
              value={usuario.fecha_nacimiento}
              onInput={(e) => setUsuario({ ...usuario, fecha_nacimiento: e.target.value })}
              type="date"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce fecha de nacimiento.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Select
              required
              value={usuario.nivel}
              onInput={(e) => setUsuario({ ...usuario, nivel: e.target.value })}
              type="text"
            >
              <option>Empezando</option>
              <option>Principiante</option>
              <option>Casual</option>
              <option>Pro</option>
              <option>Tony Hawk</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={usuario.pswd}
                onInput={(e) => setUsuario({ ...usuario, pswd: e.target.value })}
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Introduce una contraseña.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Foto de perfil</Form.Label>
              <Form.Control
                type="file"
                key={clave}
                onChange={(e) => setUsuario({ ...usuario, foto: e.target.files[0] })}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Registro;
