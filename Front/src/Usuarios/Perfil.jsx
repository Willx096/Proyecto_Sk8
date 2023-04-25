import React from "react";
import { useState, useEffect, useContext } from "react";
import {Container, Row, Col, Table} from 'react-bootstrap';

import Eliminar from "./Eliminar";

//demomento solo lo usamos para el id
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";

function Perfil() {
  const { id } = useContext(GlobalContext)
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  //para que cuando se actualizan los datos se vuelva a ejecutar el cargarPerfil
  const [refresh, setRefresh] = useState(0);

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
}, [refresh])   
//cada vez que cambia el valor de refresh se ejecuta cargarPerfil

//para que antes de leer lo q sigue cargue los datos
if (!datos) return <>...</>

const filas = datos.Eventos.map((el, index) => (
  <tr key={index}>
    <td>{el.titulo}</td>
    <td>{el.descripcion}</td>
  </tr>
));

const filitas = datos.Participacions.map((el, index) => (
  <tr key={index}>
    <td>{el.id_evento}</td>
    
   
  </tr>
));

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
    {/* {datos.Eventos[0].titulo} */}
    <Table striped bordered hover>
        <thead>
          <tr>
           
            <th>Nombre</th>
            <th>email</th>
          
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </Table>
    </Col>
    <Col>
    {/* {datos.Eventos[0].titulo} */}
    <Table striped bordered hover>
        <thead>
          <tr>
           
            <th>Eventos que se ha participado</th>
          
          </tr>
        </thead>
        <tbody>{filitas}</tbody>
      </Table>
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
    <Editar perfil={datos} refresh={refresh}  setRefresh={setRefresh} />
    </Col>
    </Row>
  </Container>
 
  </>;
}

export default Perfil;
