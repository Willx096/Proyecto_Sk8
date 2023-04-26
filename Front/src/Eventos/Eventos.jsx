import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, ListGroupItem, ListGroup } from "react-bootstrap";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";

function Eventos(props) {


  
  const [direccion, setDireccion] = useState("");
  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    direccion: "",
    latitud: 0,
    longitud: 0,
    nivel: "",
    participantes: "",
  });

  useEffect(() => {
    setEvento({
      ...evento,
      direccion: direccion.display_name,
      longitud: direccion.lon * 1,
      latitud: direccion.lat * 1,
    });
  }, [direccion]);


function MostrarEvento(e){

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "titulo": "",
  "descripcion": "",
  "fecha": "",
  "hora": "",
  "latitud": "",
  "nivel": "",
  "participantes": "",
  "foto": ""
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:5000/api/eventos", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


}



  return (
    <Container>
      <MapView direccion={direccion} setDireccion={setDireccion} />
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Evento</Card.Title>
          <Card.Text>
            <ListGroup.Item>Titulo</ListGroup.Item>
            <ListGroup.Item>Descripción</ListGroup.Item>
            <ListGroup.Item>Fecha</ListGroup.Item>
            <ListGroup.Item>Hora</ListGroup.Item>
            <ListGroup.Item>direccion</ListGroup.Item>
            <ListGroup.Item>Nivel</ListGroup.Item>
            <ListGroup.Item>Participantes</ListGroup.Item>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

Eventos.propTypes = {};

export default Eventos;
