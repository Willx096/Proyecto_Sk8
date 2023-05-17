import React from "react";
import encabezado from "../public/VideoInicio.mp4";
import titulo from "./img/Grafiti.png"
import Registro from "./Usuarios/Registro";
import "./inicio.css";
import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Inicio(props) {
  const { showRegister, setShowRegister, setShowLogin } =
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

  const element = document.getElementById("content");

function scrollToTop() {
  setShowRegister(true)
  element.scrollIntoView(true);
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
    <Card style={ index % 2 === 0 ? { alignSelf: "flex-start", minWidth: '70%', maxWidth: '70%'} : { alignSelf: "flex-end", minWidth: '70%', maxWidth: '70%' }}>
      
        <Card.Body>
        <div className="containerValoraciones">
        <div>
        <div className="valoracionInicio"><img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
                src={"http://localhost:5000/" + el.Usuario.foto}
                alt=""
              /><div><b>{el.Usuario.nombre}</b> </div>
            <div className="valoracionInicio"> 
                    {el.valoracion}</div>
          </div>
          <div className="tituloValoracion"><b>{el.Evento.titulo}</b>    Nivel <i>{el.Evento.nivel}</i></div></div>
          
        <div className="puntuacionValo"><div>{el.puntuacion}/5</div><div><FontAwesomeIcon icon={faStar} /></div></div>
        
        </div>
        </Card.Body>
     
  
    </Card>
    ))
  

  return (
    <div >
    
       <div className="video">
       <video src={encabezado} autoPlay loop muted className="img-fluid video" alt="imagen-inicio" />
       <div className="sobreposicion">
        {/* <img src={titulo} className="logoweb" alt="" /> */}
        <h2>Skate Zone</h2>
        <p>Skate Zone una web hecha por Skaters para Skaters. En esta web podrás compartir con otras personas tu pasión por el skate, tengas el nivel que tengas.</p>
        
        <div className="botones"><Button variant="dark" onClick={() => setShowLogin(true)}>
              {/* hacer este tambien con boton de bootstrap o asi */}
              
                Inicia sesión
              
            </Button>
              <p>o</p>
              <Button 
                variant="dark"
                
                onClick={() => (
                  scrollToTop()
                )}
              >
                Registrate
              </Button>
              </div>
        </div>
       </div>
      
      <div className="cardsValoraciones" style={{display: 'flex', flexDirection: 'column' }}>
        {Valorations}
      </div>
      
     <div id="content"> {!showRegister ? (<></>) : (<Registro />)}</div>
    </div>
  );
}

export default Inicio;
