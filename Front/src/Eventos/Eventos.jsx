import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Marker, useMap } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import { Icona4 } from "./Icona";

import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router";
function Eventos(props) {
  const [direccion, setDireccion] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
 // const [eventoDetalle, setEventoDetalle] = useState({});
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

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
 
  const goTo = useNavigate();
  function goToEvento(id) {
    console.log("id de evento:" + id);
    goTo("/perfil-evento/" + id);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((response) => response.json())
      .then((x) => {
        console.log(x);
        setEvento(x.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  

  function handleMarcadorClick(evento) {
  if (new Date(evento.fecha + " " + evento.hora) > new Date()) {
    setEventoSeleccionado(evento);
    setMostrarTarjeta(true) 
  } else {
    setEventoSeleccionado(null);
  }
}

function handleMapClick(){
  setMostrarTarjeta(false);
}

  /**
   * En este codigo se usa el método filter para filtrar la lista de eventos antes de ser creados 
   */
  const eventoDisponibles = evento.filter((e)=> new Date (e.fecha + " " + e.hora  ) > new Date());

  //const eventoDetalle = eventoSeleccionado && new Date(eventoSeleccionado.fecha + " " + eventoSeleccionado.hora) > new Date() ? eventoSeleccionado : {};

  const eventoDetalle =
    eventoSeleccionado !== -1 ? evento[eventoSeleccionado] : {};

  const marcadores = eventoDisponibles.map((e, idx) => (
    <Marker
      className="marcador"
      eventHandlers={{ click: () => handleMarcadorClick(e) }}
      key={idx}
      position={[e.latitud * 1, e.longitud * 1]}
      icon={Icona4}
    ></Marker>
  ));

  // const eventoDetalle =
  //   eventoSeleccionado !== -1 ? evento[eventoSeleccionado] : {};

  return (
    <>
      <Container fluid="lg">
        <MapView
          direccion={direccion}
          setDireccion={setDireccion}
          marcadores={marcadores}
          onClick={handleMapClick}
        />
      </Container>
      <br />
      <Container fluid="lg">
        {mostrarTarjeta && (
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <p className="text-center">{evento.titulo}</p>
                <p className="text-center">{evento.descripcion}</p>
                <p className="text-center">{evento.fecha}</p>
                <p className="text-center">{evento.hora}</p>
                <p className="text-center">{evento.direccion}</p>
                <p className="text-center">{evento.participantes}</p>
                <Button onClick={() => goToEvento(evento.id)}>
                  Mas Informacion
                </Button>
              </Card>
            </Col>
          </Row>
         )} 
      </Container>
    </>
  );
}

export default Eventos;
