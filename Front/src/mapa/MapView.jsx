import { useEffect, useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Row, Col } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import GlobalContext from "../GlobalContext";


const primers = [
  {
    adr: "figueres",
    lat: 42.2667,
    long: 2.9667,
  },
  {
    adr: "molina",
    lat: 42.3427392,
    long: 1.9562059,
  },
  {
    adr: "girona",
    lat: 41.9842,
    long: 2.8239,
  },
];

export default ({ direccion, setDireccion, marcadores }) => {
  const { cargaInfo } = useContext(GlobalContext);
  /**
   *  Valores que varian del estado actual a uno actualizado
   */

  const [llocs, setLlocs] = useState(primers);
  const [center, setCenter] = useState([41.3879,  2.16992]);

  /**
   *  Llama la función getLocation y comprueba si el navegador es compatible con la API,
   * si es asi lama a la función getCurrentPosition() de la API, que recupera la ubicación actual del usuario y llama a la función coords() con las coordenadas de esa ubicación como argumento.
   * */

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(coords);
    }
  }

  /**
   * Toma las coordenadas recibidas de la función getCurrentPosition() y las utiliza para actualizar el centro del mapa.
   * En este ejemplo, la función utiliza la función setCenter() para establecer las coordenadas de la posición como el nuevo centro del mapa.
   */

  function coords(position) {
    console.log("centre", position);
    setCenter([position.coords.latitude, position.coords.longitude]);
  }

  useEffect(() => {
    getLocation();
  }, []);

  /**
   * Este código define una función de React llamada GestioEventsMapa que utiliza el hook useMapEvents proporcionado por la biblioteca Leaflet.js.
   * Este hook se utiliza para manejar eventos de interacción con el mapa.
   * recibe un objeto que especifica los eventos a manejar y las funciones que se ejecutarán cuando se produzcan esos eventos.
   * El objeto de eventos incluye dos propiedades: click y locationfound.
   * La propiedad click especifica una función que se ejecutará cuando el usuario haga clic en el mapa.
   * La función llama a la API de OpenStreetMap Nominatim para obtener la dirección correspondiente a las coordenadas del lugar en el que se hizo clic. Una vez que se recibe la respuesta de la API, la función actualiza el estado de la dirección y agrega un nuevo objeto con la dirección, latitud y longitud a la lista de lugares (llocs).
   */

  function GestioEventsMapa() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("adr", data);
            setDireccion(data);
            setLlocs([{ adr: data.display_name, lat, long: lng }]);
            setCenter([lat, lng]);
          });
      },
      /**
       * Especifica una función que se ejecutará cuando el mapa encuentre la ubicación del usuario. En este ejemplo, la función simplemente imprime la ubicación en la consola.
       */
      locationfound: (location) => {
        console.log("location found:", location);
      },
    });
    return null;
  }
  /**
   * La función CentraMapa toma un objeto centre como prop que contiene las coordenadas de la ubicación a la que se debe centrar el mapa.
   * La función useMap devuelve el objeto map del mapa Leaflet actual, que se almacena en la variable map.
   * La función useEffect se utiliza para actualizar el centro del mapa cada vez que cambian las coordenadas del centro.
   * la función setView() se utiliza para establecer las coordenadas del centro como el nuevo centro del mapa.
   */
  const CentraMapa = ({ centre }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(centre);
    }, centre);
    return null;
  };

  if (!marcadores) {
    marcadores = llocs.map((e, idx) => (
      <Marker key={idx} position={[e.lat, e.long]} onClick={cargaInfo}>
        <Popup>{e.adr}</Popup>
      </Marker>
    ));
  }

  return (
    <>
      <Row>
        <Col>
          <MapContainer
            className="mapa"
            center={center}
            zoom={11}
            scrollWheelZoom={true}
          >
            <CentraMapa centre={center} />
            <GestioEventsMapa />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {marcadores}
          </MapContainer>
        </Col>
      </Row>
    </>
  );
};
