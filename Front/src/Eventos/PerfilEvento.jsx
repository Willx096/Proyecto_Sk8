import React from "react";
import { useState, useEffect, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Eventos from "./Eventos";
import EditarEvento from "./EditarEvento";

function PerfilEvento({ evento, refresh, setRefresh }) {
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

  console.log("provando datos", datos);
  //Tabla de eventos
  const filas = (
    <Card.Body>
      <Card.Title>{datos.titulo}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {datos.descripcion}
      </Card.Subtitle>
      <Card.Text>
        Fecha: {datos.fecha} Hora: {datos.hora}
      </Card.Text>
      <Card.Text>Dirección: {datos.direccion}</Card.Text>
      <Card.Text>Nivel: {datos.nivel}</Card.Text>
      <Card.Text>
        Participantes: {datos.Participacions.length}/{datos.participantes}:
      </Card.Text>
      <Card.Text>
        {/* Muestra los nkckames separados por comoas */}
        Participantes1:{" "}
        <span>
          {datos.Participacions.map((e) => e.Usuario?.nickname).join(", ")}
        </span>
        {/* Muestra los nkckames sin separar por comoas y coje el id del usuario y te manda a perfi/id pero solo muestra tu usuario */}
        Participantes:{" "}
        <span>
          {datos.Participacions.map((e, i) => (
            <Button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
              {" "}
              {e.Usuario.nickname}
            </Button>
          ))}
        </span>
        <br />
      </Card.Text>
      {/* valores que solo queremos mostrar al acabar el evento osea en mostrar evento
      <Card.Text>
        Valoraciones: {datos.Participacions.map((e) => e.valoracion).join("\n")}
      </Card.Text>
      <Card.Text>
        Puntuacion: {datos.Participacions.map((e) => e.puntuacion).join("\n")}
      </Card.Text> */}
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

    fetch("http://localhost:5000/api/participacion/apuntarse", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setApuntado(!apuntado)) // actualiza el estado de apuntado/desapuntado
      .then(() => setRefresh(refresh + 1)) // actualiza el estado de apuntado/desapuntado
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <Card border="dark">
        <Button onClick={goToMostrar}>Más Informacion</Button>
        {filas}
        {userid === datos.id_usuario ? ( //Si el usuario logeado coincide con el id_usuario del evento le mostrara para editar
          <>
            <h3>Mi Evento</h3>
          </>
        ) : datos.participantes > datos.Participacions.length ? (
          // Si hay plazas disponibles, muestra un botón para apuntarse o desapuntarse llamando a la función Apuntarse
          <Button onClick={Apuntarse} variant={apuntado ? "danger" : "primary"}>
            {apuntado ? "Desapuntarse" : "Apuntarse"}
          </Button>
        ) : (
          // Si el evento está completo, muestra un mensaje
          <h3>Evento completo</h3>
        )}
      </Card>
    </div>
  );
}

export default PerfilEvento;
