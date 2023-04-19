import React from "react";
import { useState, useEffect, useContext } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Example from "./EditarPerfil";
import Eliminar from "./Eliminar";

//demomento solo lo usamos para el id
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";

function Perfil() {
  const { id } = useContext(GlobalContext)
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);

  //funcion que llama a los datos de la base de datos
  function cargarPerfil() {
//cuando tengamos el login podremos poner con el context {id} en vez de poner directamente el 1
    fetch(`http://localhost:5000/api/usuarios/${id}`)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setDatos(resultado2.data);
        } else {
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    cargarPerfil();
}, [])

  return <>
  <Container fluid>
    <Row lg={3}>
    <Col>
      {datos.nombre}
    </Col>
    <Col>
      {datos.apellido}
    </Col>
    <Col>
      {datos.foto}
    </Col>
    </Row>
    <Row lg={3}>
    <Col>
      {datos.email}
    </Col>
    <Col>
      {datos.nivel}
    </Col>
    <Col>
      {datos.fecha_nacimiento}
    </Col>
    </Row>
    <Row lg={3}>
    <Col>
      {datos.experiencia}
    </Col>
    <Col>
      {datos.descripcion}
    </Col>
    <Col>
      {datos.nickname}
    </Col>
    </Row>
    <Row lg={3}>
    <Col>
      {datos.contact}
    </Col>
    <Col>
    <Eliminar/>
    </Col>
    <Col>
    <Editar/>
    </Col>
    </Row>
  </Container>
 
  </>;
}

export default Perfil;
