import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col, } from "react-bootstrap";
import { Marker, Tooltip } from 'react-leaflet';
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";

function Eventos(props) {
  const [direccion, setDireccion] = useState("");
  const [evento, setEvento] = useState([
    {
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      direccion: "",
      latitud: 0,
      longitud: 0,
      nivel: "",
      participantes: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((response) => response.json())
      .then((x) => {
        console.log(x);
        setEvento(x.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  console.log(llistaEventos);
  const llistaEventos = evento.map((e, idx) => {
    return (
      <Col key={idx} md={4} xs={12} sm={6} lg={3} className="mb-3 ">
        <Card>
          <Card.Body>
            <Card.Title>{e.titulo}</Card.Title>
            <Card.Text>{e.descripcion}</Card.Text>
            <Card.Text>{e.fecha}</Card.Text>
            <Card.Text>{e.hora}</Card.Text>
            <Card.Text>{e.direccion}</Card.Text>
            <Card.Text>{e.participantes}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  // 

  const marcadores = evento.map((e, idx) => (
    <Marker key={idx} position={[e.latitude, e.longitude]}>
      <Tooltip>
        <p>Titulo:{e.titulo}</p>
        <p>Descripcon:{e.descripcion}</p>
        <p>Fecha:{e.fecha}</p>
        <p>Hora:{e.hora}</p>
        <p>Latitud:{e.latitud}</p>
        <p>Longitud:{e.longitud}</p>
      </Tooltip>
    </Marker>
  ));

  return (
    <>
      <Container fluid="lg">
        <MapView direccion={direccion} setDireccion={setDireccion} />
        {marcadores}
      </Container>
      <br />
      <Container fluid="lg">
        <Row>{llistaEventos}</Row>
      </Container>
    </>
  );
}

export default Eventos;
