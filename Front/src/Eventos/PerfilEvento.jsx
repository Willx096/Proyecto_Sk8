import React from "react";
import { useState, useEffect, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Eventos from "./Eventos";

function PerfilEvento(props) {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [apuntado, setApuntado] = useState(false);
  const { eventoId } = useParams();
  //para que cuando se actualizan los datos se vuelva a ejecutar el cargarPerfil
  const [refresh, setRefresh] = useState(0);

  //funcion que llama a los datos de la base de datos
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
          setDatos([resultado2.data]);
          console.log("xxx", resultado2.data);
          const participantes = resultado2.data.Participacions.map(
            (e) => e.id_usuario
          );
          setApuntado(participantes.includes(userid));
        } else {
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }, [refresh]);
  //cada vez que cambia el valor de refresh se ejecuta el useEffect

  //para que antes de leer lo q sigue cargue los datos
  if (!datos) return <>...</>;

  console.log("provando", datos);
  // const goTo = useNavigate();
  // function goToPerfil(id) {
  //   console.log("id de usuario:" + id);
  //   goTo("/perfil-usuario/" + id);
  // }

  //tabla de eventos creados
  const filas = datos.map((el, index) => (
    <Card.Body key={index}>
      <Card.Title>{el.titulo}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {el.descripcion}
      </Card.Subtitle>
      <Card.Text>Fecha: {el.fecha}</Card.Text>
      <Card.Text>Dirección: {el.direccion}</Card.Text>
      <Card.Text>Nivel: {el.nivel}</Card.Text>
      <Card.Text>Participantes: {el.Participacions.length}/{el.participantes}:</Card.Text>
      <Card.Text>
        Participantes: <span>{el.Participacions.map((e) => e.Usuario.nickname).join(",")}</span>
      </Card.Text>
      <Card.Text>
        Valoraciones: {el.Participacions.map((e) => e.valoracion).join("\n")}
      </Card.Text>
      <Card.Text>
        Puntuacion: {el.Participacions.map((e) => e.puntuacion).join("\n")}
      </Card.Text>
    </Card.Body>
  ));

  function Apuntarse() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id_evento: eventoId,
      id_usuario: userid,
    });

    var requestOptions = {
      method: apuntado ? "DELETE" : "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/participacion/apuntarse", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setApuntado(!apuntado))
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <h3>Informacion del evento</h3>
      <Card border="dark">
        {filas}
        {datos[0].participantes > datos[0].Participacions.length ? 
        <Button onClick={Apuntarse} variant={apuntado ? "danger" : "primary"}>
          {apuntado ? "Desapuntarse" : "Apuntarse"}
        </Button> : <h3>El evento esta completo</h3>} 
      </Card>
    </div>
  );
}

export default PerfilEvento;
