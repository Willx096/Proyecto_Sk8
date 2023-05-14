import React, { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Carousel } from "react-bootstrap";
import "../Eventos/Evento.css";
import MapView from "../mapa/MapView";

function MostrarEvento({}) {
  const [datos, setDatos] = useState(null);
  const { id } = useParams();
  const [direccion, setDireccion] = useState("");
  // const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/api/eventos/${id}`)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setDatos(resultado2.data);
          console.log("xxx", resultado2.data);
        }
      })
      .catch((error) => setError("error", error));
  }, []);

  const listacard = [];

  if (!datos) return <h3>Loading...</h3>;

  return (
    <Container>
      <br />
      <div>
        {/* <img
      src={"http://localhost:5000/" + datos.foto}
      style={{ width: 100 }}
      alt=""
    /> */}
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://blog.slideinline.com/wp-content/uploads/2021/08/mejores-skateparks-en-valencia.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Evento {id}</h3>
              <p>{datos.direccion}</p>
              <br />
              <p>{datos.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src="https://blog.slideinline.com/wp-content/uploads/2020/12/skatepark-forum-barcelona.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Evento Nº{id}</h3>
              <p>{datos.direccion}</p>
              <br />
              <p>{datos.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://upload.wikimedia.org/wikipedia/commons/0/06/Skatepark_cs.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Evento {id}</h3>
              <p>{datos.direccion}</p>
              <br />
              <p>{datos.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Row>
          <Col className="box">
            <h3 className="text-center"></h3>
            <br />
          </Col>
          <Row>
            <Col></Col>
          </Row>
        </Row>
      </div>
      <div>
        <span>
          <br />
          <div className="box-mapa">
            <p className="texto-mapa">
              <br />
              <b>Nivel: </b>
              {datos.nivel}
              <br />
              <b>Fecha: </b>
              {datos.fecha}
              <br />
              <b>Hora:</b> {datos.hora}
              <br />
              <b>Participantes:</b>
              {datos.Participacions.map((e, i) => (
                <button key={i} onClick={() => goToPerfil(e.Usuario.id)}>
                  {" "}
                  {e.Usuario.nickname}
                </button>
              ))}
            </p>

            <MapView
              className="mapa-mostrar-evento"
              setDireccion={setDireccion}
            />
          </div>
          <div className="targeta">
            <Card style={{ width: "18rem" }}>
              <img
                src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                alt="user"
                className="imagen-usuario"
              />
              <p className="puntuacion">
                {datos.Participacions.map((e) => e.puntuacion).join("\n")}
              </p>
              <hr />
              <b className="valoracion">Valoraciones:</b> <br />
              <p className="texto-valoracion">
                {datos.Participacions.map((e) => e.valoracion).join("\n")}
              </p>
            </Card>            
          </div>
        </span>
      </div>
    </Container>
  );
}

export default MostrarEvento;
