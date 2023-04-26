import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container, InputGroup } from "react-bootstrap";

function Registro(props) {
  //Validate para validar que los campos se han rellenado
  const [validated, setValidated] = useState(false);
  //Creamos este state clave refrescar el valor de la foto
  const [clave, setClave] = useState(0);
  //State con array de objetos de usuario para no hacer muchos states
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nivel: "Empezando",
    fecha_nacimiento: "",
    pswd: "",
    experiencia: "Menos de un mes",
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
      setValidated(true);
      return;
    }

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
        setValidated(false);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Container>
      <Form
        id="registro-id"
        noValidate
        validated={validated}
        className="text-center"
        onSubmit={CrearUsuario}
      >
        <Row xs={1} sm={2} md={3}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              value={usuario.nombre}
              onInput={(e) =>
                setUsuario({ ...usuario, nombre: e.target.value })
              }
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
              onInput={(e) =>
                setUsuario({ ...usuario, apellido: e.target.value })
              }
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
              onInput={(e) =>
                setUsuario({ ...usuario, nickname: e.target.value })
              }
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
              placeholder="f3ranz4@gmail.com"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustomContact">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              value={usuario.contacto}
              onInput={(e) =>
                setUsuario({ ...usuario, contacto: e.target.value })
              }
              type="txt"
              placeholder="684925275/instagram"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              required
              value={usuario.fecha_nacimiento}
              onInput={(e) =>
                setUsuario({ ...usuario, fecha_nacimiento: e.target.value })
              }
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tiempo patinando</Form.Label>
            <Form.Select
              required
              value={usuario.experiencia}
              onInput={(e) =>
                setUsuario({ ...usuario, experiencia: e.target.value })
              }
              type="text"
            >
              <option>Menos de un mes</option>
              <option>Unos mese</option>
              <option>1 año</option>
              <option>Más de 1 año</option>
              <option>Muchos años</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
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
        </Row>
        <Row md={3}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Foto de perfil</Form.Label>
            <Form.Control
              type="file"
              key={clave}
              onChange={(e) =>
                setUsuario({ ...usuario, foto: e.target.files[0] })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              value={usuario.descripcion}
              onChange={(e) =>
                setUsuario({ ...usuario, descripcion: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="primary" type="submit">
              Registrar-se
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}

export default Registro;
