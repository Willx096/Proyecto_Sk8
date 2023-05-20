import React, { useEffect, useState, useContext } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Carousel } from "react-bootstrap";
import { Marker } from "react-leaflet";
import "../Eventos/Evento.css";
import GlobalContext from "../GlobalContext";
import { goldIcona, greenIcona, redIcona, greyIcona } from "./Icona";
import MapSimple from "../mapa/MapSimple";

function MostrarEvento({ }) {
  const { API_URL, IMG_URL } = useContext(GlobalContext);
  const [evento, setEvento] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(API_URL + `eventos/${id}`)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setEvento(resultado2.data);
          if (eventoSeleccionado.id) {
            const z = x.data.find((e) => e.id === eventoSeleccionado.id);
            setEventoSeleccionado(z);
          }
          console.log("xxx", resultado2.data);
        }
      })
      .catch((error) => setError("error", error));
  }, []);

  if (!evento) return <h3>Loading...</h3>;

  const listacards = evento.Participacions.filter((e) => e.valoracion).map(
    (e, idx) => {
      return (
        <Col key={idx} xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card>
            {/* <img
            src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
            alt="user"
            className="imagen-usuario"
          /> */}
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "80px",
                objectFit: "cover",
              }}
              src={IMG_URL + e.Usuario.foto}
              className="imagen-usuario"
              alt=""
            />
            <p className="usuario">{e.Usuario.nickname}</p>
            <p className="puntuacion">{e.puntuacion}/5</p>
            <hr />
            <b className="valoracion">Descripción:</b>
            <br />
            <p className="texto-valoracion">{e.valoracion}</p>
          </Card>
        </Col>
      );
    }
  );

  const marcador = (
    <Marker
      className="button"
      eventHandlers={{ click: () => handleMarcadorClick(evento) }}
      position={[evento.latitud * 1, evento.longitud * 1]}
      icon={
        evento.nivel === "Avanzado"
          ? redIcona
          : evento.nivel === "Intermedio"
            ? goldIcona
            : greenIcona
      }
    ></Marker>
  );

  return (
    <div class="mx-5">
      <br />

      <img
        src={IMG_URL + evento.foto}
        style={{ width: 100 }}
        alt=""
      />
      <h3 className="text-center">{evento.titulo}</h3>
      <Carousel className="carusel-fotos">
        {evento.FotosEventos.map((e, idx) => (
          <Carousel.Item key={idx} interval={1000}>
            <img
              className="imagen-carousel img-fluid"
              height={360}
              width={100}
              src={IMG_URL + e.fotos}
              alt="First slide"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
      <Row>
        <Col>
          <div className="texto-evento">
            <p className="descripcion2">
              <p>
                <b>Descripción:</b>
              </p>
              {evento.descripcion}
              <p>
                <b>Dirección:</b>
              </p>
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
          <MapSimple
            marcador={marcador}
            center={[evento.latitud * 1, evento.longitud * 1]}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">{listacards}</Row>
    </div>
  );
}

export default MostrarEvento;
