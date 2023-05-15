import React, { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Carousel } from "react-bootstrap";
import { Marker } from "react-leaflet";
import "../Eventos/Evento.css";
import { goldIcona, greenIcona, redIcona, greyIcona } from "./Icona";
import MapView from "../mapa/MapView";

function MostrarEvento({}) {
  const [evento, setEvento] = useState(null);
  const { id } = useParams();
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/eventos/${id}`)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setEvento(resultado2.data);
          console.log("xxx", resultado2.data);
        }
      })
      .catch((error) => setError("error", error));
  }, []);

  if (!evento) return <h3>Loading...</h3>;

  const listacards = evento.Participacions.map((e, idx) => {
    return (
      <Col>
        <Card key={idx} style={{ width: "18rem" }} lg={2}>
          <img
            src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
            alt="user"
            className="imagen-usuario"
          />
          <p className="puntuacion">{e.puntuacion}</p>
          <hr />
          <b className="valoracion">Valoraciones:</b> <br />
          <p className="texto-valoracion">{e.valoracion}</p>
        </Card>
      </Col>
    );
  });

//   <Marker
//   className="button"
//   eventHandlers={{ click: () => handleMarcadorClick(e) }}
//   key={idx}
//   position={[e.latitud * 1, e.longitud * 1]}
//   icon={
//     eventoSeleccionado.id === e.id
//       ? greyIcona
//       : e.nivel === "Avanzado"
//       ? redIcona
//       : e.nivel === "Intermedio"
//       ? goldIcona
//       : greenIcona
//   }
// ></Marker>

  return (
    <Container>
      <br />

      <img
        src={"http://localhost:5000/" + evento.foto}
        style={{ width: 100 }}
        alt=""
      />
      <h3 className="text-center">{evento.titulo}</h3>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            height={250}
            src="https://blog.slideinline.com/wp-content/uploads/2021/08/mejores-skateparks-en-valencia.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            height={250}
            src="https://blog.slideinline.com/wp-content/uploads/2020/12/skatepark-forum-barcelona.jpg"
            alt="Second slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={250}
            src="https://upload.wikimedia.org/wikipedia/commons/0/06/Skatepark_cs.jpg"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row>
        <Col>
        <div className="texto-evento">
        <p className="descripcion2">
          <p className="texto-des"><b>Descripción:</b></p> 
           {evento.descripcion}
           <p className="texto-des2"><b>Dirección:</b></p>
           {evento.direccion}
            <br />
           
          </p>
        </div>
        <div className="texto-evento2">
        <p>
          <b>Nivel: </b>
          {evento.nivel}
          <br />
          <b>Fecha: </b>
          {evento.fecha}
          <br />
          <b>Hora:</b> {evento.hora}
          <br />
          <b>Participantes:</b>{" "}
          {evento.Participacions.map((e, i) => (
            <button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
              {" "}
              {e.Usuario.nickname}
            </button>
          ))}
          </p>         
        </div>
          
          
         
          
        </Col>
        <Col xs={3}>
          <MapView
            className="mapa-mostrar-evento"
            setDireccion={setDireccion}
            direccion={direccion}
          />
        </Col>
      </Row>
      <Row>{listacards}</Row>
    </Container>
  );
}

export default MostrarEvento;
