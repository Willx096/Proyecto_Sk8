import React from "react";
import encabezado from "../public/VideoInicio.mp4";
import Registro from "./Usuarios/Registro";
import "./inicio.css";

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
