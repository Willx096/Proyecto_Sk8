import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Eliminar from "./Eliminar";
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";
import Valoraciones from "./Valoraciones";
import FotosEvento from "./FotosEvento";

function Perfil() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  //Funcion para datos del perfil
  function cargarPerfil() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    fetch(`http://localhost:5000/api/usuarios/${userid}`, requestOptions)
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
  }, [refresh]);
  //cada vez que cambia el valor de refresh se ejecuta cargarPerfil

    if (!datos) return <>...</>;

  //Constante que contiene la foto
  const foto = (
    <img
      src={"http://localhost:5000/" + datos.foto}
      style={{ width: 100 }}
      alt=""
    />
  );

  //Tabla de eventos creados
  const filas = datos.Eventos.map((el, index) => (
    <tr key={index}>
      <td>{el.titulo}</td>
      <td>{el.fecha}</td>
      <td>{el.nivel}</td>
      <td>{el.participantes}</td>
      <td>{el.ubicacion}</td>
      <td>{el.Participacions[0].valoracion}</td>
      {/* <td>{calculaMedia(el.Participacions)}</td> */}
      {/* falta mostrr con un filter su valoracion */}
    </tr>
  ));

  //Tabla de eventos en los que se ha participado
  const filitas = datos.Participacions.map((el, index) => (
    <tr key={index}>
      <td>{el.Evento.titulo}</td>
      <td>{el.Evento.fecha}</td>
      <td>{el.Evento.nivel}</td>
      <td>{el.Evento.participantes}</td>
      <td>{el.Evento.ubicacion}</td>
      <td>{el.Usuario.nombre}</td>
      <td>{el.valoracion}</td>
      <td><Valoraciones cargarPerfil={cargarPerfil} eventoid={el.Evento.id}/></td>

    </tr>
  ));

  return (
    <>
      <Container fluid>
        <Row lg={3}>{foto}</Row>
        <Row lg={3}>
          {datos.nombre} {datos.apellido}
        </Row>
        <Row>{datos.nickname}</Row>
        <Row lg={3}>{datos.descripcion}</Row>
        <Row>Nivel: {datos.nivel}</Row>
        <Row>Experiencia: {datos.experiencia} años</Row>
        <Row lg={3}>{datos.contacto}</Row>
        <br />
        <Row lg={3}>
          <Col>
            <Editar perfil={datos} refresh={refresh} setRefresh={setRefresh} />
          </Col>
        </Row>
        <br />
        <Row lg={3}>
          <Col>
            <Eliminar />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h3>Eventos creados</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Fecha</th>
                  <th>Nivel</th>
                  <th>Participantes</th>
                  <th>Ubicacion</th>
                  <th>Valoracion</th>
                </tr>
              </thead>
              <tbody>{filas}</tbody>
            </Table>
          </Col>
          <Col>
            <h3>Eventos en los que se ha participado</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Fecha</th>
                  <th>Nivel</th>
                  <th>Participantes</th>
                  <th>Ubicacion</th>
                  <th>Creador</th>
                  <th>Valoracion</th>
                </tr>
              </thead>
              <tbody>{filitas}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Perfil;
