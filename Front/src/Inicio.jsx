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
        <h1>Hello!</h1>
      </div>
      <hr />
      <Registro />
    </>
  );
}

export default Inicio;
