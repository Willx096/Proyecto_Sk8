import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Marker, useMap, Popup } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import { goldIcona, greenIcona, redIcona, greyIcona } from "./Icona";

import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router";
import { icon } from "leaflet";
function Eventos(props) {
  const { userid } = useContext(GlobalContext);
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
      setMostrarTarjeta(true);
    } else {
      setEventoSeleccionado(null);
    }
  }

  function handleMapClick() {
    setMostrarTarjeta(false);
  }

  /**
   * En este codigo se usa el método filter para filtrar la lista de eventos antes de ser creados
   */
  const eventosDisponibles = evento.filter(
    (e) => new Date(e.fecha).getTime() > new Date().getTime()
  );

  const marcadores = eventosDisponibles.map((e, idx) => (
    <Marker
      className="button"
      eventHandlers={{ click: () => handleMarcadorClick(e) }}
      key={idx}
      position={[e.latitud * 1, e.longitud * 1]}
      icon={
        e.nivel === "avanzado"
          ? redIcona
          : e.nivel === "intermedio"
          ? goldIcona
          : greenIcona
          
      }
    ></Marker>
  ));

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
                <p className="text-center">{eventoSeleccionado.titulo}</p>
                <p className="text-center">{eventoSeleccionado.descripcion}</p>
                <p className="text-center">{eventoSeleccionado.fecha}</p>
                <p className="text-center">{eventoSeleccionado.hora}</p>
                <p className="text-center">{eventoSeleccionado.direccion}</p>
                <p className="text-center">
                  {eventoSeleccionado.participantes}
                </p>
                <Button onClick={() => goToEvento(eventoSeleccionado.id)}>
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
