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

function Perfil() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [futuros, setFuturos] = useState(false);
  const [pasados, setPasados] = useState(false);
  const [todos, setTodos] = useState(false);
  const [futuro, setFuturo] = useState(false);
  const [pasado, setPasado] = useState(false);
  const [todo, setTodo] = useState(false);

  const goTo = useNavigate();
  function goToPerfil(id_usuario) {
    goTo("/perfil/" + id_usuario); // Redirige a la página de perfil del usuario
  }

  function goToEvento(id_evento) {
    goTo("/eventos/" + id_evento); // Redirige a la página de perfil del usuario
  }

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
    console.log("usuari", usuarioId);
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
      <Card key={index}>
        <div className="cardsEventos container">
          <Card.Body >
            <div className="posicionDatos row">
              <div  className="tituloEvento">
                <b>{el.titulo}</b>
              </div>
              <div className="nivel ">
                Nivel: <i>{el.nivel}</i>
              </div>
            </div >
            <div className="datosEventos"><div className="datosEventos">
              Participantes: {el.participantes}
            </div>
            <div className="datosEventos">
              Ubicación: Calle de mi madre,45, Barcelona 08888
            </div>
            </div>
            <div className="posicionDatos row">
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
              <div className="fecha">
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

  //Eventos pasados
  const creadoPasado = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => {
    //obtengo los valores de las puntuaciones
    const puntuaciones2 = el.Participacions.map((e) => e.puntuacion);
    //llamo a la funcion que calcula la media
    const media = valoMedia(puntuaciones2);
    // const media = valoMedia(puntuaciones2).toFixed(1);
    return (
      <Card key={index}>
        <div className="cardsEventos">
          <Card.Body>
            <div className="posicionDatos">
              <div className="tituloEvento">
                <b>{el.titulo}</b>
              </div>
              <div className="nivel">
                Nivel: <i>{el.nivel}</i>
              </div>
            </div>
            <div className="datosEventos">
              Participantes: {el.participantes}
            </div>
            <div className="datosEventos">
              Calle de mi madre,45, Barcelona 08888
            </div>
            <div className="datosEventos">
              Val. Media: <b>{media}</b>
            </div>
            <div className="posicionDatos">
              <div className="fecha">
                <i>{new Date(el.fecha).toLocaleDateString()}</i>
              </div>
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
            </div>
          </Card.Body>
        </div>
      </Card>
    );
  });

  // onClick={() => goToEvento(el.Evento.id)}

  // Tabla de eventos en los que se ha participado
  //Eventos futuros
  const participadoFuture = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => (
    <Card key={index}>
      <div className="cardsEventos container">
        <Card.Body>
          <div className="posicionDatos row">
            <div className="tituloEvento col">
              <b>{el.Evento.titulo}</b>
            </div>
            <div className="nivel col">
              Nivel: <i>{el.Evento.nivel}</i>
            </div>
            <div><img  
              style={{ width: "30px", borderRadius: "30px" }}
              src={"http://localhost:5000/" + el.Usuario.foto}
              alt=""
            />
            <button onClick={() => goToPerfil(el.Evento.id_usuario)}>
              {el.Usuario.nombre}
            </button></div>
          </div>
          <div className="datosEventos col">{el.Evento.participantes}</div>
          <div className="datosEventos col">
            Calle de mi madre,45, Barcelona 08888
          </div>
          <div className="datosEventos col">{el.puntuacion}</div>

          <div className="fecha ">
            <i>{new Date(el.Evento.fecha).toLocaleDateString()}</i>
          </div>
        </Card.Body>
      </div>
    </Card>
  ));

  //Eventos pasados
  const participadoPasado = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => (
    <Card key={index}>
      <div className="cardsEventos">
        <Card.Body>
          <div className="posicionDatos">
            <div className="tituloEvento">
              <b>{el.Evento.titulo}</b>
            </div>
            <div className="nivel">
              Nivel: <i>{el.Evento.nivel}</i>
            </div>
          </div>
          <div className="datosEventos">
            Participantes: {el.Evento.participantes}
          </div>
          <div className="datosEventos">
            Calle de mi madre,45, Barcelona 08888
          </div>
          <div className="datosEventos">Puntuado con un: {el.puntuacion}/5</div>

          {usuarioId !== undefined ? (
            <div></div>
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
                      <i>Valorado</i>
                    </p>
                  </>
                )}
              </div>
              <div></div>
            </div>
          )}

          <div className="posicionDatos">
            <div className="fecha">
              <i>{new Date(el.Evento.fecha).toLocaleDateString()}</i>
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

  console.log(userid);
  console.log(usuarioId);
  console.log(futuros);
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
          <div div className="eventos">
            <div>
              <h3>Eventos creados</h3>
            </div>

            <Button onClick={() => (setFuturos(true),
              setPasados(false),
              setTodos(false))}>Futuros</Button>
            <Button onClick={() => (setFuturos(false),
              setPasados(true),
              setTodos(false))}>Pasados</Button>
            <Button onClick={() => (setFuturos(false),
              setPasados(false))}>Todos</Button>
            {futuros ? <div>{creadoFuture}</div> : <div></div>}

            {pasados ? <div>{creadoPasado}</div> : <div></div>}

            {!futuros && !pasados ? (
              <div>
                {creadoFuture}
                {creadoPasado}
              </div>
            ) : (
              <div></div>
            )}

            
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <div className="eventos">
            <div>
              <h3>Participaciones</h3>
            </div>
            <div>
            <Button onClick={() => (setFuturo(true),
              setPasado(false),
              setTodo(false))}>Futuros</Button>
            <Button onClick={() => (setFuturo(false),
              setPasado(true),
              setTodo(false))}>Pasados</Button>
            <Button onClick={() => (setFuturo(false),
              setPasado(false))}>Todos</Button>
            {futuro ? <div>{participadoFuture}</div> : <div></div>}

            {pasado ? <div>{participadoPasado}</div> : <div></div>}

            {!futuro && !pasado ? (
              <div>
                {participadoPasado}
              {participadoFuture}
              </div>
            ) : (
              <div></div>
            )}
                       
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
