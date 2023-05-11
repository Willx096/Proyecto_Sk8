import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function MostrarEvento({ evento }) {
  const [datos, setDatos] = useState(evento);
  const { eventoId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
   

    fetch(`http://localhost:5000/api/eventos/${eventoId}`, requestOptions)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setDatos(resultado2.data);
          console.log("xxx", resultado2.data);
          const participantes = resultado2.data.Participacions.map(
            (e) => e.id_usuario
          );
        }
      })
      .catch((error) => setError("error", error));
  });

  // const filas = (
  //   <Card.Body>
  //     <Card.Title>{datos.titulo}</Card.Title>
  //     <Card.Subtitle className="mb-2 text-muted">
  //       {datos.descripcion}
  //     </Card.Subtitle>
  //     <Card.Text>
  //       Fecha: {datos.fecha} Hora: {datos.hora}
  //     </Card.Text>
  //     <Card.Text>Dirección: {datos.direccion}</Card.Text>
  //     <Card.Text>Nivel: {datos.nivel}</Card.Text>
  //     <Card.Text>
  //       Participantes: {datos.Participacions.length}/{datos.participantes}:
  //     </Card.Text>
  //   </Card.Body>
  // );

  console.log(evento)
  return (
    <Container>
      <h3>Información del evento</h3>
      {/* <Card>
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
          Participantes: {datos.Participacions.length}/ {datos.participantes}
        </Card.Text>
        <Card.Text>
          Valoraciones:{" "}
          {datos.Participacions.map((e) => e.valoracion).join("\n")}
        </Card.Text>
        <Card.Text>
          Puntuacion:{datos.Participacions.map((e) => e.puntuacion).join("\n")}
        </Card.Text>
      </Card> */}
    </Container>
  );
}

export default MostrarEvento;
