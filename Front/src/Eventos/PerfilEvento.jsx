 import React from "react";
import { useState, useEffect, useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUsers} from "@fortawesome/free-solid-svg-icons";

function PerfilEvento({ evento, refresh, setRefresh }) {
  const { API_URL } = useContext(GlobalContext);
  const participantes = evento.Participacions.map((e) => e.id_usuario);
  const datos = evento;

  const { userid, token } = useContext(GlobalContext);
  const [apuntado, setApuntado] = useState(participantes.includes(userid));
  const { eventoId } = useParams();

  const goTo = useNavigate();
  function goToPerfil(id_usuario) {
    console.log("id de usuario:" + id_usuario);
    goTo("/perfil/" + id_usuario); // Redirige a la página de perfil del usuario
  }

  function goToMostrar() {
    goTo("/mostrar-evento/" + evento.id); // Redirige a la página de perfil del usuario
  }

  if (!datos) return <>...</>; // Si "datos" es null, muestra puntos suspensivos mientras se carga

  useEffect(() => {
    setApuntado(participantes.includes(userid));
  }, [evento]);

  //Tabla de eventos
  const filas = (
    <Card.Body className="eventoSeleccionado">
      <Card.Header  as="h3">{datos.titulo}</Card.Header>
      <ListGroup className="list-group-flush">
      <ListGroup.Item className="mb-2">
      Evento creado por:{" "+datos.Usuario.nickname}
      </ListGroup.Item>
      <ListGroup.Item className="mb-2">
        {datos.descripcion}
      </ListGroup.Item>
        <ListGroup.Item className="mb-2">
          Fecha: <b>{new Date(datos.fecha).toLocaleDateString()}</b> Hora: <b>{datos.hora}</b>
        </ListGroup.Item>
        <ListGroup.Item className="mb-2"><FontAwesomeIcon icon={faLocationDot} /> {datos.direccion}</ListGroup.Item>
        <ListGroup.Item className="mb-2">Nivel: {datos.nivel}</ListGroup.Item>
        <ListGroup.Item>
          {/* Muestra los nkckames separados por comoas */}
          {/* Participantes1:{" "}
        <span>
          {datos.Participacions.map((e) => e.Usuario?.nickname).join(", ")}
        </span> */}
          {/* Muestra los nkckames sin separar por comoas y coje el id del usuario y te manda a perfi/id pero solo muestra tu usuario */}
          <FontAwesomeIcon icon={faUsers} /> {datos.Participacions.length}/{datos.participantes}
        </ListGroup.Item>
        <ListGroup.Item> Lista de participantes:
            {datos.Participacions.map((e, i) => (
              <Card.Link
                className="participantesLista"
                key={i}
                onClick={() => goToPerfil(e.Usuario.id)}
              >
                {" "}
                {e.Usuario.nickname}
              </Card.Link>
            ))}
          </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  );

  function Apuntarse() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Crea un objeto JSON que contiene el ID del evento y el ID del usuario
    var raw = JSON.stringify({
      id_evento: datos.id,
      id_usuario: userid,
    });

    var requestOptions = {
      method: apuntado ? "DELETE" : "POST", // si ya se ha apuntado, el método será DELETE, de lo contrario POST
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL+"participacion/apuntarse", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setApuntado(!apuntado)) // actualiza el estado de apuntado/desapuntado
      .then(() => setRefresh(refresh + 1)) // actualiza el estado de apuntado/desapuntado
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <Card  style={{ marginTop: "30px"}} >
        {filas}
        {userid === datos.id_usuario ? ( //Si el usuario logeado coincide con el id_usuario del evento le mostrara para editar
          <>
            <Card.Footer className="text-center text-muted">Mi evento</Card.Footer>
          </>
        ) : datos.participantes > datos.Participacions.length ? (
          // Si hay plazas disponibles, muestra un botón para apuntarse o desapuntarse llamando a la función Apuntarse
          <Button onClick={Apuntarse} variant={apuntado ? "danger" : "primary"}>
            {apuntado ? "Desapuntarse" : "Apuntarse"}
          </Button>
        ) : (
          // Si el evento está completo, muestra un mensaje
          <Card.Footer className="text-center text-muted">Evento lleno</Card.Footer>
        )}
      </Card>
      {/* <Button onClick={goToMostrar}>Más Informacion</Button> */}
    </>
  );
}

export default PerfilEvento;
