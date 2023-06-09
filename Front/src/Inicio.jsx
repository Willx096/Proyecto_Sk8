import React from "react";
import encabezado from "../public/VideoInicio.mp4";
import Registro from "./Usuarios/Registro";
import Footer from "./Footer";
import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";

function Inicio() {
  const { showRegister, setShowRegister, setShowLogin, API_URL } =
    useContext(GlobalContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  //navegación entre perfiles
  const goTo = useNavigate();

  function goToEvento(id_evento) {
    goTo("/mostrar-evento/" + id_evento); // Redirige al perfil del evento
  }

  //para que se muestre y te lleve al registro
  const element = document.getElementById("content");

  function scrollToTop() {
    setShowRegister(true);
    element.scrollIntoView(true);
  }

  function showValoration() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(API_URL + `participacion`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          setData(res.data);
        } else {
          setError(res.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    showValoration();
  }, [refresh]);

  if (!data)
    return (
      <div className="sinDatos">
        <FontAwesomeIcon icon={faSpinner} spin spinReverse size="2xl" />
      </div>
    );

  //fecha actual
  const fechaHoy = new Date();

  const Valorations = data
    .filter((el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime())
    .map((el, index) => (
      <Card
        onClick={() => goToEvento(el.id_evento)}
        style={
          index % 2 === 0
            ? { alignSelf: "flex-start", minWidth: "70%", maxWidth: "70%" }
            : { alignSelf: "flex-end", minWidth: "70%", maxWidth: "70%" }
        }
      >
        <Card.Body>
          <div className="containerValoraciones">
            <div>
              <div className="valoracionInicio">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "30px",
                    objectFit: "cover",
                  }}
                  src={"http://localhost:5000/" + el.Usuario.foto}
                  alt=""
                />
                <div>
                  <b>{el.Usuario.nombre}</b>{" "}
                </div>
                <div className="valoracionInicio">{el.valoracion}</div>
              </div>
              <div className="tituloValoracion">
                <b>{el.Evento.titulo}</b> Nivel <i>{el.Evento.nivel}</i>
              </div>
            </div>

            <div className="puntuacionValo">
              <div>{el.puntuacion}/5</div>
              <div>
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    ));

  return (
    <>
      <div>
        <div className="video">
          <video
            src={encabezado}
            autoPlay
            loop
            muted
            className="img-fluid video"
            alt="imagen-inicio"
          />
          <div className="sobreposicion">
            <img
              src="../src/img/nombreWeb.PNG"
              className="nombreWeb"
              alt="Hola"
            />

            <div className="botones">
              <Button variant="dark" onClick={() => setShowLogin(true)}>
                Inicia sesión
              </Button>

              <Button variant="dark" onClick={() => scrollToTop()}>
                Regístrate
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="tituloDivCards">
            <h2><i>Experiencias</i></h2>
          </div>
          <div
            className="cardsValoraciones"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {Valorations}
          </div>
        </div>

        <div> {!showRegister ? <></> : <Registro />}</div>

        <Footer />
      </div>
      <div id="content"></div>
    </>
  );
}

export default Inicio;
