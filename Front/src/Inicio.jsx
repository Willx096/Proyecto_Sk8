import React from "react";
import { Container, Image } from "react-bootstrap";
import encabezado from "./img/inicio.jpg";
import "./inicio.css";
import Registro from "./Usuarios/Registro";

function Inicio(props) {
  return (
    <>
      <img
        src={encabezado}
        className="img-fluid" 
        alt="imagen-inicio"
      />
      <hr/>
      <Registro />
    </>
  );
}

export default Inicio;
