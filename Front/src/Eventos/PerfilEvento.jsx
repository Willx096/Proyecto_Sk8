import React from "react";
import { useState, useEffect, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Eventos from "./Eventos";
import EditarEvento from "./EditarEvento";

function PerfilEvento(props) {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [apuntado, setApuntado] = useState(false);
  const { eventoId } = useParams();
  const [refresh, setRefresh] = useState(0);

  const goTo = useNavigate();
  function goToPerfil(id_usuario) {
    console.log("id de usuario:" + id_usuario);
    goTo("/perfil/" + id_usuario); // Redirige a la página de perfil del usuario
  }

  // Define un efecto que se ejecutará cada vez que cambie el valor de refresh
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    //cuando tengamos el login podremos poner con el context {id} en vez de poner directamente el 1
    fetch(`http://localhost:5000/api/eventos/${eventoId}`, requestOptions)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          // Si la respuesta indica que todo está bien, actualiza el estado "datos" con los datos del evento
          setDatos([resultado2.data]);
          console.log("xxx", resultado2.data);
          const participantes = resultado2.data.Participacions.map(
            (e) => e.id_usuario
          );
          setApuntado(participantes.includes(userid)); // Actualiza el estado "apuntado" en función de si el usuario está apuntado al evento o no
        } else {
          // Si la respuesta indica que hay un error, actualiza el estado "error"
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }, [refresh]);

  if (!datos) return <>...</>; // Si "datos" es null, muestra puntos suspensivos mientras se carga

  console.log("provando datos", datos);
  //Tabla de eventos
  const filas = datos.map(
    (
      el,
      index // Crea una fila para cada evento encontrado
    ) => (
      <Card.Body key={index}>
        <Card.Title>{el.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {el.descripcion}
        </Card.Subtitle>
        <Card.Text>Fecha: {el.fecha} Hora: {el.hora}</Card.Text>
        <Card.Text>Dirección: {el.direccion}</Card.Text>
        <Card.Text>Nivel: {el.nivel}</Card.Text>
        <Card.Text>
          Participantes: {el.Participacions.length}/{el.participantes}:
        </Card.Text>
        <Card.Text>
          {/* Muestra los nkckames separados por comoas */}
          {/* Participantes1:{" "}
        <span>
          {el.Participacions.map((e) => e.Usuario?.nickname).join(", ")}
        </span>
        <br /> */}
          {/* Muestra los nkckames sin separar por comoas y coje el id del usuario y te manda a perfi/id pero solo muestra tu usuario */}
          Participantes:{" "}
          <span>
            {el.Participacions.map((e, i) => (
              <Button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
                {" "}
                {e.Usuario.nickname}
              </Button>
            ))}
          </span>
          <br />
        </Card.Text>
        <Card.Text>
          Valoraciones: {el.Participacions.map((e) => e.valoracion).join("\n")}
        </Card.Text>
        <Card.Text>
          Puntuacion: {el.Participacions.map((e) => e.puntuacion).join("\n")}
        </Card.Text>
      </Card.Body>
    )
    
  );
  
  function Apuntarse() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Crea un objeto JSON que contiene el ID del evento y el ID del usuario
    var raw = JSON.stringify({
      id_evento: eventoId,
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
    .catch((error) => console.log("error", error));
  }
  
  return (
    <div>
      <h3>Informacion del evento</h3>
      <Card border="dark">
        {filas}        
        {userid === datos[0].id_usuario ? ( //Si el usuario logeado coincide con el id_usuario del evento le mostrara para editar
          <EditarEvento datosE={datos} refresh={refresh} setRefresh={setRefresh}/>
        ) : datos[0].participantes > datos[0].Participacions.length ? (
          // Si hay plazas disponibles, muestra un botón para apuntarse o desapuntarse llamando a la función Apuntarse
          <Button onClick={Apuntarse} variant={apuntado ? "danger" : "primary"}>
            {apuntado ? "Desapuntarse" : "Apuntarse"}
          </Button>
        ) : (
          // Si el evento está completo, muestra un mensaje
          <h3>Evento esta completo</h3>
        )}
      </Card>
    </div>
  );
}

export default PerfilEvento;
