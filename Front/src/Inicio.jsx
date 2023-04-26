import React from "react";
import { Container, Image } from "react-bootstrap";
import encabezado from "../public/VideoInicio.mp4";
import "./inicio.css";
import Registro from "./Usuarios/Registro";

function Inicio(props) {
  return (
    <>
      <div>
        <video src={encabezado} autoPlay loop muted className="img-fluid" alt="imagen-inicio" />
      </div>
      <hr />
      <Registro />
    </>
  );
}

export default Inicio;
