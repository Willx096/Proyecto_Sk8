import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Marker, useMap, Popup } from "react-leaflet";
import MapView from "../mapa/MapView";
import "../mapa/leaflet.css";
import { goldIcona, greenIcona, redIcona, greyIcona, blueIcona } from "./Icona";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUsers } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../GlobalContext";
import PerfilEvento from "./PerfilEvento";
import MostrarEvento from "./MostrarEvento";

function Eventos(props) {
  const { userid } = useContext(GlobalContext);
  const [direccion, setDireccion] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  // const [eventoDetalle, setEventoDetalle] = useState({});
  const [eventos, setEventos] = useState([]);
  console.log(eventos);
  const [refresh, setRefresh] = useState(0);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [nivelSelect, setNivelSelect] = useState("Todos los Niveles");
  const [fechaSelect, setFechalSelect] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((response) => response.json())
      .then((x) => {
        console.log("Eventos recibidos", x);
        setEventos(x.data);
        if (eventoSeleccionado.id) {
          const z = x.data.find((e) => e.id === eventoSeleccionado.id);
          setEventoSeleccionado(z);
        }
      })
      .catch((error) => console.log("error", error));
  }, [refresh]);

  function handleMarcadorClick(ev) {
    setEventoSeleccionado(ev);
    setMostrarTarjeta(true);
  }

  function handleMapClick() {
    setMostrarTarjeta(false);
  }
  /**
   * En este codigo se usa el método filter para filtrar la lista de eventos antes de ser creados
   */
  const eventosDisponibles = eventos.filter(
    // Filtra la lista de eventos para mostrar solo los que cumplen con los criterios de búsqueda
    (e) =>
      new Date(e.fecha).getTime() >= new Date(fechaSelect).getTime() && //Fecha actual hacia adelante para no mostrar eventos pasados
      (nivelSelect === "Todos los Niveles" || nivelSelect === e.nivel) //En funcion del nivel selecionado muestra los eventos con ese nivel
  );
  console.log("Eventos disponibles", eventosDisponibles);
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
          : e.nivel === "Principiante"
          ? greenIcona
          : blueIcona
      }
    ></Marker>
  ));

  return (
    <>
      <div class="mx-5">
        <div className="tituloEventosd">
            <h3>Eventos Disponibles</h3>
        </div>
        <Row xs={1} sm={1} lg={2}>
          <Col>
            <Row className="mb-1">
              <Form.Group as={Col} sm={5}>
                <Form.Label>Filtrar Nivel</Form.Label>
                <Form.Select
                  type="text"
                  value={nivelSelect}
                  onChange={(e) => setNivelSelect(e.target.value)}
                >
                  <option>Todos los Niveles</option>
                  <option>Todos</option>
                  <option>Principante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Filtrar Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaSelect}
                  onChange={(e) => setFechalSelect(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <MapView
              direccion={direccion}
              setDireccion={setDireccion}
              marcadores={marcadores}
              onClick={handleMapClick}
            />
            <Row>
              <div className="leyenda">
                <div className="contenidoLeyenda">
                  Todos
                  <br />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ color: "#2990ff" }}
                  />
                </div>
                <div className="contenidoLeyenda">
                  Principiante
                  <br />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ color: "#17c814" }}
                  />
                </div>
                <div className="contenidoLeyenda">
                  Intermedio
                  <br />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ color: "#e8e23b" }}
                  />
                </div>
                <div className="contenidoLeyenda">
                  Avanzado
                  <br />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ color: "#e30d0d" }}
                  />
                </div>
              </div>
            </Row>
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
      </div>
    </>
  );
}

export default Eventos;
