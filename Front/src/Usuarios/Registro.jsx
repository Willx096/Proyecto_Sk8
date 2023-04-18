import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "react-bootstrap";

function Registro(props) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nivel: "",
    fecha_nacimiento: "",
    pswd: "",
    experiencia: "",
    foto: null,
    descripcion: "",
    nickname: "",
    contacto: null,
  });

  function CrearUsuario(e) {
    e.preventDefault();

    var raw = JSON.stringify({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      nivel: usuario.nivel,
      fecha_nacimiento: usuario.fecha_nacimiento,
      pswd: usuario.pswd,
      experiencia: usuario.experiencia,
      foto: usuario.foto,
      descripcion: usuario.descripcion,
      nickname: usuario.nickname,
      contacto: usuario.contacto,
    });
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch("localhost:5000/api/usuarios", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <div>
      <Row>
        <Col md={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
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
              <Form.Control value={usuario.email}
                onInput={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                } type="email" placeholder="email@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control value={usuario.fecha_nacimiento}
                onInput={(e) =>
                  setUsuario({ ...usuario, fecha_nacimiento: e.target.value })
                } type="date" placeholder="Disabled input" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nivel</Form.Label>
              <Form.Select>
                <option>Empezando</option>
                <option>Principiante</option>
                <option>Casual</option>
                <option>Pro</option>
                <option>Tony Hawk</option>
              </Form.Select>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={usuario.pswd}
                onInput={(e) =>
                  setUsuario({ ...usuario, pswd: e.target.value })
                } type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Acepto terminos de condicion"
                />
              </Form.Group>
            </Form.Group>
            <Button variant="primary" onClick={CrearUsuario} type="button">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

Registro.propTypes = {};

export default Registro;
