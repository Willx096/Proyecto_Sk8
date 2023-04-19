import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "react-bootstrap";

function Registro(props) {
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
    <div>
      <Form onSubmit={CrearUsuario}>
        <Row md={2}>
          <Form.Group className="mb-3">
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              value={usuario.apellido}
              onInput={(e) =>
                setUsuario({ ...usuario, apellido: e.target.value })
              }
              type="txt"
              placeholder="Perez"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              value={usuario.nickname}
              onInput={(e) =>
                setUsuario({ ...usuario, nickname: e.target.value })
              }
              type="txt"
              placeholder="Fran34"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={usuario.email}
              onInput={(e) => setUsuario({ ...usuario, email: e.target.value })}
              type="email"
              placeholder="email@gmail.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              value={usuario.fecha_nacimiento}
              onInput={(e) =>
                setUsuario({ ...usuario, fecha_nacimiento: e.target.value })
              }
              type="date"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Select
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={usuario.pswd}
                onInput={(e) =>
                  setUsuario({ ...usuario, pswd: e.target.value })
                }
                type="password"
                placeholder="Password"
              />
            </Form.Group>
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
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Row>
      </Form>
    </div>
  );
}

Registro.propTypes = {};

export default Registro;
