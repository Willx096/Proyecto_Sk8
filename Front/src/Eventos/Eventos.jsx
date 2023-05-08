import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Marker, useMap, Popup } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import { goldIcona, greenIcona, redIcona, greyIcona } from "./Icona";

import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router";

function Eventos(props) {
  const { userid } = useContext(GlobalContext);
  const [direccion, setDireccion] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  // const [eventoDetalle, setEventoDetalle] = useState({});
  const [eventos, setEventos] = useState([]);

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
        setEventos(x.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  function handleMarcadorClick(ev) {
    if (new Date(ev.fecha + " " + ev.hora) > new Date()) {
      setEventoSeleccionado(ev);
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
  const eventosDisponibles = eventos.filter(
    (e) => new Date(e.fecha).getTime() > new Date().getTime()
  );

  const marcadores = eventosDisponibles.map((e, idx) => (
    <Marker
      className="button"
      eventHandlers={{ click: () => handleMarcadorClick(e) }}
      key={idx}
      position={[e.latitud * 1, e.longitud * 1]}
      icon={
        eventoSeleccionado.id === e.id
          ? greyIcona
          : e.nivel === "avanzado"
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
                <p className="text-center">
                  Titulo: {eventoSeleccionado.titulo}
                </p>
                <p className="text-center">{eventoSeleccionado.descripcion}</p>
                <p className="text-center">
                  Fecha: {eventoSeleccionado.fecha} Hora: {eventoSeleccionado.hora}
                </p>
                <p className="text-center">{eventoSeleccionado.direccion}</p>
                <p className="text-center">Nº Participantes: {eventoSeleccionado.participantes}
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
