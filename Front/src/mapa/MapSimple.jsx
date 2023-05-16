import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { Row, Col } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

export default ({ marcador, center }) => {


  return (
    <>
      <Row>
        <Col>
          <MapContainer
            className="mapa-mostrar-evento"
            center={center}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {marcador}
          </MapContainer>
        </Col>
      </Row>
    </>
  );
};
