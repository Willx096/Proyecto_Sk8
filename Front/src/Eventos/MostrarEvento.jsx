import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button} from "react-bootstrap";

function MostrarEvento({  }) {
  const [datos, setDatos] = useState(null);
  const { id } = useParams();
  // const [error, setError] = useState(false);
  useEffect(() => {

    fetch(`http://localhost:5000/api/eventos/${id}`)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setDatos(resultado2.data);
          console.log("xxx", resultado2.data);
        }
      })
      .catch((error) => setError("error", error));
  }, []);

  

  if (!datos)  return <h3>Loading...</h3>
  
  return (
    <Container>
      <h3>Información del evento {id}</h3>
      <Card>
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
          Participantes:
          <span>
          {datos.Participacions.map((e, i) => (
            <Button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
              {" "}
              {e.Usuario.nickname}
            </Button>
          ))}
        </span>
        </Card.Text>
        <Card.Text>
          Valoraciones:{" "}
          {datos.Participacions.map((e) => e.valoracion).join("\n")}
          
        </Card.Text>
        <Card.Text>
          Puntuacion:{datos.Participacions.map((e) => e.puntuacion).join("\n")} 
        </Card.Text>
      </Card>
    </Container>
    );
}

export default MostrarEvento;
