import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Marker, useMap, Popup } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import { goldIcona, greenIcona, redIcona, greyIcona } from "./Icona";
import GlobalContext from "../GlobalContext";
import PerfilEvento from "./PerfilEvento";

function Eventos(props) {
  const { userid } = useContext(GlobalContext);
  const [direccion, setDireccion] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  // const [eventoDetalle, setEventoDetalle] = useState({});
  const [eventos, setEventos] = useState([]);
  console.log(eventos)
  const [refresh, setRefresh] = useState(0);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  // const [nivel, setNivel] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((response) => response.json())
      .then((x) => {
        console.log("Eventos recibidos",x);
        setEventos(x.data);
        if (eventoSeleccionado.id) {
          const z = x.data.find((e) => e.id === eventoSeleccionado.id);
          setEventoSeleccionado(z);
        }
      })
      .catch((error) => console.log("error", error));
  }, [refresh]);

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
          : e.nivel === "Avanzado"
          ? redIcona
          : e.nivel === "Intermedio"
          ? goldIcona
          : greenIcona
      }
    ></Marker>
  ));

  return (
    <>
      <Container>
        <Row xs={1} sm={1} lg={2}>
          <Col>
            <h3>Mapa de eventos</h3>
            <h5>Filtros:</h5>
            <Form></Form>
            <Form.Group>
              <Form.Label>Nivel</Form.Label>
              <Form.Select
                type="text"
                // value={eventos.nivel}
                // onInput={(e) => setEventos({ ...eventos, nivel: e.target.value })}
              >
                <option>Selecciona el Nivel</option>
                <option>Principante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </Form.Select>
            </Form.Group>
            <MapView
              direccion={direccion}
              setDireccion={setDireccion}
              marcadores={marcadores}
              onClick={handleMapClick}
            />
          </Col>
          <Col>
            {mostrarTarjeta && (
              <PerfilEvento
                refresh={refresh}
                setRefresh={setRefresh}
                evento={eventoSeleccionado}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Eventos;
