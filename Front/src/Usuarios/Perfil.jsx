import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import Eliminar from "./Eliminar";
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";
import Valoraciones from "./Valoraciones";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import EditarEvento from "../Eventos/EditarEvento";
import EliminarEvento from "../Eventos/Eliminar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUsers } from "@fortawesome/free-solid-svg-icons";
function Perfil() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  let { usuarioId } = useParams();

  //filtros
  const [createFuture, setCreateFuture] = useState(false);
  const [createPast, setCreatePast] = useState(false);
  const [participateFuture, setParticipateFuture] = useState(false);
  const [participatePast, setParticipatePast] = useState(false);

  //navegación entre perfiles
  const goTo = useNavigate();

  function goToPerfil(id_usuario) {
    goTo("/perfil/" + id_usuario); // Redirige a la página de perfil del usuario
  }

  function goToEvento(id_evento) {
    goTo("/mostrar-evento/" + id_evento); // Redirige al perfil del evento
  }

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

  if (!datos) return <>...</>;

  //Constante que contiene la foto de perfil
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

  //fecha actual
  const fechaHoy = new Date();

  // Tabla de eventos creados que aun no han pasado
  const EventsCreatedFuture = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => {
    return (
      <Card>
        <div className="cardsEventos container">
          <Card.Body>
            <div className=" row">
            <div
                className="tituloEvento"
              >
                <b>{el.titulo}</b>
              </div>
              <div className="nivel ">
                Nivel: <i>{el.nivel}</i>
              </div>
            </div>
            <div className="datosEventos">
              <div className="posicionIconos">
                <FontAwesomeIcon icon={faLocationDot} />
                <div>{el.direccion}</div>
              </div>
              <br />
              <div className="posicionIconos">
                <FontAwesomeIcon icon={faUsers} /> <div>{el.participantes}</div>
              </div>
            </div>
            <div className="row">
              {usuarioId !== undefined ? (
                <div></div>
              ) : (
                <div>
                  <div className="botones col">
                    <EditarEvento
                      eventoId={el.id}
                      eventos={el}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                    <EliminarEvento
                      eventoId={el.id}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </div>
                  <div>
                    <i>Fecha: {new Date(el.fecha).toLocaleDateString()}</i>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
    );
  });

  //Eventos creados que ya han pasado
  const EventsCreatedPast = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => {
    const puntuaciones = el.Participacions.map((e) => e.puntuacion);
    //llamo a la funcion que calcula la media
    const media = valoMedia(puntuaciones);
    // const media = valoMedia(puntuaciones2).toFixed(1);
    return (
      <Card>
        <div className="cardsEventos">
          <Card.Body>
            <div className="posicionDatos row">
              <div
                className="tituloEvento"
              >
                <b>{el.titulo}</b>
              </div>
              <div className="nivel">
                Nivel: <i>{el.nivel}</i>
              </div>
              <div className="datosEventos">
                Valoración media: <b>{media}</b>/5
              </div>
            </div>
            <div className="datosEventos">
              <div className="posicionIconos">
                <FontAwesomeIcon icon={faLocationDot} />
                <div>{el.direccion}</div>
              </div>
              <br />
              <div className="posicionIconos">
                <FontAwesomeIcon icon={faUsers} /> <div>{el.participantes}</div>
              </div>
            </div>

            <div className="posicionDatos row">
              {usuarioId !== undefined ? (
                <div></div>
              ) : (
                <div>
                  <div className="botones">
                    <EditarEvento
                      eventoId={el.id}
                      eventos={el}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />

                    <EliminarEvento
                      eventoId={el.id}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </div>
                </div>
              )}
              <div className="fecha">
                Fecha: <i>{new Date(el.fecha).toLocaleDateString()}</i>
                <button
              onClick={() => goToEvento(el.Evento.id)}
              key={index}
              className="tituloEvento col"
            >
              + info
            </button>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    );
  });

  //Eventos en los que se ha apuntado
  const EventParticipateFuture = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => (
    <Card>
      <div className="cardsEventos container">
        <Card.Body>
          <div className="posicionDatos row">
            <div
              className="tituloEvento"
            >
              <b>{el.Evento.titulo}</b>
            </div>
            <div className="nivel">
              Nivel: <i>{el.Evento.nivel}</i>
            </div>
          </div>

          <div className="datosEventos">
            <div className="posicionIconos">
              <FontAwesomeIcon icon={faLocationDot} />
              <div>{el.Evento.direccion}</div>
            </div>
            <br />
            <div className="posicionIconos">
              <FontAwesomeIcon icon={faUsers} />{" "}
              <div>{el.Evento.participantes}</div>
            </div>
          </div>

          <div className="creador">
            {" "}
            <div className="fecha ">
              <i>{new Date(el.Evento.fecha).toLocaleDateString()}</i>
            </div>
            <div>
              {/* <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "30px",
                objectFit: "cover",
              }}
              src={"http://localhost:5000/" + el.Usuario.foto}
              alt=""
            /> */}
              By:
              <button onClick={() => goToPerfil(el.Evento.id_usuario)}>
                {el.Usuario.nombre}
              </button>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  ));

  //Eventos en los que se ha apuntado que ya han pasado
  const EventParticipatePast = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => (
    <Card>
      <div className="cardsEventos">
        <Card.Body>
          <div className="posicionDatos row">
            <div
              className="tituloEvento col"
            >
              <b>{el.Evento.titulo}</b>
            </div>
            <div className="nivel">
              Nivel: <i>{el.Evento.nivel}</i>
            </div>
          </div>
          <div className="valoraciones">
            {usuarioId !== undefined ? (
              <div>
                <div className="datosEventos">
                  Puntuado por {el.Usuario.nombre} con un: {el.puntuacion}/5
                </div>
              </div>
            ) : (
              <div>
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
                      <p>
                        <div className="datosEventos">
                          Puntuado con un: {el.puntuacion}/5
                        </div>
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="datosEventos">
            <div className="posicionIconos">
              <FontAwesomeIcon icon={faLocationDot} />
              <div>{el.Evento.direccion}</div>
            </div>
            <br />
            <div className="posicionIconos">
              <FontAwesomeIcon icon={faUsers} />{" "}
              <div>{el.Evento.participantes}</div>
            </div>
          </div>

          <div className="creador">
            <div className="fecha">
              <i>{new Date(el.Evento.fecha).toLocaleDateString()}</i>
              <button
              onClick={() => goToEvento(el.id_evento)}
              key={index}
              className="tituloEvento col"
            >
              + info
            </button>
            </div>
            <div>
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
                src={"http://localhost:5000/" + el.Usuario.foto}
                alt=""
              />
           
              <button onClick={() => goToPerfil(el.Evento.id_usuario)}>
                {el.Usuario.nombre}
              </button>
            </div>
          </div>
        </Card.Body>
      </div>
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
          <div></div>
          <div className="nickname">@{datos.nickname}</div>
          <hr />
          <div className="nivel">
            Nivel - <b>{datos.nivel}</b>
          </div>
          <div className="nivel">
            Experiencia - <b>{datos.experiencia}</b>
          </div>
          <hr />
          {!datos.contacto ? (
            <div></div>
          ) : (
            <div className="contacto">
              Contacto - <i>{datos.contacto}</i>
            </div>
          )}
        </Col>

        <Col xs={12} lg={6} className="columnasDatos">
          <div className="descripcion">{datos.descripcion}</div>
          <div className="botones">
            {usuarioId !== undefined ? (
              <div></div>
            ) : (
              <div>
                <Editar
                  perfil={datos}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />{" "}
                <Eliminar />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={6}>
          <div className="eventos">
            <div className="tituloSeccion">
              <h3>
                <b>Eventos creados</b>
              </h3>
            </div>

            <div className="filtros">
              <Button
                variant="outline-dark"
                onClick={() => (
                  setCreateFuture(true), setCreatePast(false)
                )}
              >
                Activos
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => (
                  setCreateFuture(false), setCreatePast(true)
                )}
              >
                Pasados
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => (setCreateFuture(false), setCreatePast(false))}
              >
                Todos
              </Button>
            </div>

            <div>
              {createFuture ? <div>{EventsCreatedFuture}</div> : <div></div>}

              {createPast ? <div>{EventsCreatedPast}</div> : <div></div>}

              {!createFuture && !createPast ? (
                <div>
                  {EventsCreatedFuture}
                  {EventsCreatedPast}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <div className="eventos">
            <div className="tituloSeccion">
              <h3>
                <b>Participaciones en eventos</b>
              </h3>
            </div>

            <div className="filtros">
              <Button
                variant="outline-dark"
                onClick={() => (
                  setParticipateFuture(true), setParticipatePast(false)
                )}
              >
                Activos
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => (
                  setParticipateFuture(false), setParticipatePast(true)
                )}
              >
                Pasados
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => (
                  setParticipateFuture(false), setParticipatePast(false)
                )}
              >
                Todos
              </Button>

             
            </div>
            <div> {participateFuture ? (
                <div>{EventParticipateFuture}</div>
              ) : (
                <div></div>
              )}

              {participatePast ? (
                <div>{EventParticipatePast}</div>
              ) : (
                <div></div>
              )}

              {!participateFuture && !participatePast ? (
                <div>
                  {EventParticipatePast}
                  {EventParticipateFuture}
                </div>
              ) : (
                <div></div>
              )}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
