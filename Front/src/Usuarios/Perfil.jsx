import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import Eliminar from "./Eliminar";
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";
import Valoraciones from "./Valoraciones";

import { useParams } from "react-router-dom";
import EditarEvento from "../Eventos/EditarEvento";
import EliminarEvento from "../Eventos/Eliminar";

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
  }, [refresh, usuarioId]);
  //cada vez que cambia el valor de refresh se ejecuta cargarPerfil

  if (!datos) return <>...</>;

  //Constante que contiene la foto
  const foto = (
    <img
      className="fotoPerfil"
      src={"http://localhost:5000/" + datos.foto}
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
      <Card  key={index}>
      <div className="cardsEventos">
      <Card.Body>
        <div className="datosEventos" ><b>{el.titulo}</b></div>
        <div className="datosEventos">Nivel: <i>{el.nivel}</i></div>
        <div className="datosEventos">Participantes: {el.participantes}</div>
        <div className="datosEventos">Calle de mi madre,45, Barcelona 08888</div>
        <div className="datosEventos"><i>{el.fecha}</i></div>
        <div><EditarEvento eventoId={el.id} eventos={el} refresh={refresh} setRefresh={setRefresh}/></div>
        <div><EliminarEvento eventoId={el.id} refresh={refresh} setRefresh={setRefresh}/></div>
      </Card.Body>
      </div>
    </Card>
    );
  });

  //Eventos pasados
  const creadoPasado = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => {
    //obtengo los valores de las puntuaciones
    const puntuaciones2 = el.Participacions.map((e) => e.puntuacion);
    //llamo a la funcion que calcula la media
    const media = valoMedia(puntuaciones2).toFixed(1);

    return (
      <Card  bg={'secondary'} text={'white'} className="cardsEventos" key={index}>
        <Card.Body>
          <div className="datosEventos" ><b>{el.titulo}</b></div>
          <div className="datosEventos">Nivel: <i>{el.nivel}</i></div>
          <div className="datosEventos">Participantes: {el.participantes}</div>
          <div className="datosEventos">Calle de mi madre,45, Barcelona 08888</div>
          <div className="datosEventos"><i>{el.fecha}</i></div>
          <div className="datosEventos">Val. Media: <b>{media}</b></div>
        </Card.Body>
      </Card>
    );
  });

  // Tabla de eventos en los que se ha participado
  //Eventos futuros
  const participadoFuture = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => (
    <Card key={index}>
      <Card.Body>
        <div>{el.Evento.titulo}</div>
        <div>{el.Evento.fecha}</div>
        <div>{el.Evento.nivel}</div>
        <div>{el.Evento.participantes}</div>
        <div>{el.Evento.direccion}</div>
        <div>{el.Usuario.nombre}</div>
        <div>{el.puntuacion}</div>
        <div></div>
      </Card.Body>
    </Card>
  ));

  //Eventos pasados
  const participadoPasado = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => (
    <Card key={index}>
      <Card.Body>
        <div>{el.Evento.titulo}</div>
        <div>{el.Evento.fecha}</div>
        <div>{el.Evento.nivel}</div>
        <div>{el.Evento.participantes}</div>
        <div>{el.Evento.direccion}</div>
        <div>{el.Usuario.nombre}</div>
        <div>
          {" "}
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
        </div>
        <div></div>
      </Card.Body>
    </Card>
  ));

  return (
    <Container fluid className="containerDatos">
      <Row>
        <Col xs={12} md={4} lg={3} className="columnasDatos">
          <div className="fotoPerfil">{foto}</div>
        </Col>

        <Col xs={12} md={6} lg={3} className="columnasDatos">
          <div className="titulos">
            {datos.nombre} {datos.apellido}
          </div>
          <div className="nickname">@{datos.nickname}</div>
          <hr />
          <div className="nivel">
            Nivel - <b>{datos.nivel}</b>
          </div>
          <div className="nivel">
            Experiencia - <b>{datos.experiencia}</b>
          </div>
          <hr />
         { !datos.contacto ? (<div></div>):( <div className="contacto">
            Contacto - <i>{datos.contacto}</i>
          </div>)}
        </Col>

        <Col xs={12} lg={6} className="columnasDatos">
          <div className="descripcion">{datos.descripcion}</div>
          <div className="botones">
            <div>
              <Editar
                perfil={datos}
                setRefresh={setRefresh}
                refresh={refresh}
              />{" "}
              <Eliminar />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="eventos">
            <div>
              <h3>Eventos creados</h3>
            </div>
            <div>
              {creadoFuture}
              {creadoPasado}
            </div>
          </div>
        </Col>
        <Col>
          <div className="eventos">
            <div>
              <h3>Participaciones</h3>
            </div>
            <div>
              {participadoPasado}
              {participadoFuture}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
