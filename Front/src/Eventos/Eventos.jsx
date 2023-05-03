import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Marker } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router";
function Eventos(props) {
  const [direccion, setDireccion] = useState("");
  const [eventoDetalle, setEventoDetalle] = useState({});
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
  const goTo = useNavigate();
  function goToEvento(id) {
    console.log("id de evento:"+id)
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

  const marcadores = evento.map((e, idx) => (
    <Marker
      className="marcador"
      eventHandlers={{ click: () => setEventoDetalle(e) }}
      key={idx}
      position={[e.latitud * 1, e.longitud * 1]}
    ></Marker>
  ));

  return (
    <>
      <Container fluid="lg">
        <MapView
          direccion={direccion}
          setDireccion={setDireccion}
          marcadores={marcadores}
        />
      </Container>
      <br />
      <Container fluid="lg">
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <p className="text-center">{eventoDetalle.titulo}</p>
              <p className="text-center">{eventoDetalle.descripcion}</p>
              <p className="text-center">{eventoDetalle.fecha}</p>
              <p className="text-center">{eventoDetalle.hora}</p>
              <p className="text-center">{eventoDetalle.direccion}</p>
              <p className="text-center">{eventoDetalle.participantes}</p>
              <Button onClick={() => goToEvento(eventoDetalle.id)}>
                Mas Informacion
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Eventos;
