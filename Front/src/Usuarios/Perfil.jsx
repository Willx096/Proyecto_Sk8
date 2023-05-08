import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Eliminar from "./Eliminar";
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";
import Valoraciones from "./Valoraciones";

import { useParams } from "react-router-dom";

function Perfil() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let { usuarioId } = useParams();

  //Funcion para datos del perfil
  function cargarPerfil() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    fetch(
      `http://localhost:5000/api/usuarios/${usuarioId || userid}`,
      requestOptions
    )
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
  }, [refresh,usuarioId]);
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

  //valoracion media
  function valoMedia(puntuaciones) {
    if (!Array.isArray(puntuaciones) || puntuaciones.length === 0) {
      return null;
    }
    const sumaTotal = puntuaciones.reduce((total, valor) => total + valor, 0);
    const media = sumaTotal / puntuaciones.length;
    return media;
  }

  const fechaHoy = new Date();

  // Tabla de eventos creados
  //Eventos futuros
  const creadoFuture = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => {
    return (
      <tr key={index}>
        <td>{el.titulo}</td>
        <td>{el.fecha}</td>
        <td>{el.nivel}</td>
        <td>{el.participantes}</td>
        <td>{el.direccion}</td>
      </tr>
    );
  });

  //Eventos pasados
  const creadoPasado = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => {
    //obtengo los valores de las puntuaciones
    const puntuaciones2 = el.Participacions.map((e) => e.puntuacion);
    //llamo a la funcion que calcula la media
    const media = valoMedia(puntuaciones2);

    return (
      <tr key={index}>
        <td>{el.titulo}</td>
        <td>{el.fecha}</td>
        <td>{el.nivel}</td>
        <td>{el.participantes}</td>
        <td>{el.direccion}</td>
        <td>{media}</td>
      </tr>
    );
  });

  // Tabla de eventos en los que se ha participado
  //Eventos futuros
  const participadoFuture = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => (
    <tr key={index}>
      <td>{el.Evento.titulo}</td>
      <td>{el.Evento.fecha}</td>
      <td>{el.Evento.nivel}</td>
      <td>{el.Evento.participantes}</td>
      <td>{el.Evento.direccion}</td>
      <td>{el.Usuario.nombre}</td>
      <td>{el.puntuacion}</td>
      <td></td>
    </tr>
  ));

  //Eventos pasados
  const participadoPasado = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => (
    <tr key={index}>
      <td>{el.Evento.titulo}</td>
      <td>{el.Evento.fecha}</td>
      <td>{el.Evento.nivel}</td>
      <td>{el.Evento.participantes}</td>
      <td>{el.Evento.direccion}</td>
      <td>{el.Usuario.nombre}</td>
      <td>{el.puntuacion}</td>
      {/* Esto mostrara o no la opcion de validar si no se ha valorado */}
      <td>
        {!el.puntuacion ? (
          <Valoraciones
            cargarPerfil={cargarPerfil}
            puntu={el.puntuacion}
            eventoid={el.Evento.id}
          />
        ) : (
          <>
            <p>Valorado</p>
          </>
        )}
      </td>
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
                  <th>Valoracion media</th>
                </tr>
              </thead>
              <tbody>
                {creadoFuture}
                {creadoPasado}
              </tbody>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {participadoFuture}
                {participadoPasado}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Perfil;
