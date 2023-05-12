import React, { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import "../Eventos/Evento.css";

function MostrarEvento({}) {
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

  if (!datos) return <h3>Loading...</h3>;

  return (
    <Container>
      <br />
      <div>
        {/* <img
      src={"http://localhost:5000/" + datos.foto}
      style={{ width: 100 }}
      alt=""
    /> */}
        <Row>
          <Col className="box">

            {/* <img
              src="http://placekitten.com/200/200"
              alt="user"
              className="foto"
            /> */}
            <h3 className="text-start">Evento {id}</h3>
            <p>{datos.descripcion}</p>
            Nivel: <b>{datos.nivel}</b>
            <br />
            <b>Fecha: </b>{datos.fecha} <b>Hora:</b> {datos.hora}
          </Col>
          <Row>
          <Col>
          
          </Col>
          </Row>
          
        </Row>
      </div>
      <div>
         
        
        <b>Dirección:</b> {datos.direccion}
        
        <b>Participantes:</b>          
          <span>
          {datos.Participacions.map((e, i) => (
            <button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
              {" "}
              {e.Usuario.nickname}
            </button>
          ))}
          <Card>
          <b>Valoraciones:</b>
          {" "}
          {datos.Participacions.map((e) => e.valoracion).join("\n")}
          </Card>
        </span>
       
          <b>Puntuacion:</b> {datos.Participacions.map((e) => e.puntuacion).join("\n")} 
      </div>
    </Container>
  );
}

export default MostrarEvento;
