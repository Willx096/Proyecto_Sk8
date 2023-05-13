import React from "react";
import encabezado from "../public/VideoInicio.mp4";
import Registro from "./Usuarios/Registro";
import "./inicio.css";
import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import GlobalContext from "./GlobalContext";

function Inicio(props) {
  const { showRegister, setShowRegister } =
  useContext(GlobalContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  let { usuarioId } = useParams();

  //navegación entre perfiles
  const goTo = useNavigate();

  function goToEvento(id_evento) {
    goTo("/perfil-evento/" + id_evento); // Redirige al perfil del evento
  }

  function showValoration() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json"},
    };

    fetch(
      `http://localhost:5000/api/participacion`,
      requestOptions
    )
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

  if (!data) return <>...</>;

  //fecha actual
  const fechaHoy = new Date();

  const Valorations = data.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => (
    <Card>
      
        <Card.Body>
        <div className="valoracionInicio">
        <div><div>{el.Usuario.nombre}</div>
        <div>@{el.Usuario.nickname}</div>
        <div><b>{el.Evento.titulo}</b></div>
        <div >Nivel: <i>{el.Evento.nivel}</i></div>
        <div>{el.valoracion}</div></div>
        <div><div>{el.puntuacion}/5</div></div>
        </div>
        {/* <div className="creador">
            <div>
            <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
                src={"http://localhost:5000/" + el.Usuario.foto}
                alt=""
              /> 
           By:{" "}
              <button onClick={() => goToPerfil(el.Evento.id_usuario)}>
                {el.Usuario.nombre}
              </button>
            </div>
          </div>  */}
        </Card.Body>
     
  
    </Card>
    ))
  

  return (
    <div>
    
        <video src={encabezado} autoPlay loop muted className="img-fluid" alt="imagen-inicio" />
      
      <div>
        {Valorations}
      </div>
      <Button
                variant="outline-dark"
                onClick={() => (
                  setShowRegister(true)
                )}
              >
                Activos
              </Button>
      {!showRegister ? (<></>) : (<Registro/>)}
    </div>
  );
}

export default Inicio;
