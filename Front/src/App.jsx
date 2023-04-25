import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";
import NavInicio from "./Navs/NavInicio";
import NavUsuario from "./Navs/NavUsuario";
import "./App.css";

function App() {
  // const usuariLoguejat = true;
  return (
    <>
      {/* {usuariLoguejat ? <NavUsuario /> : <NavInicio />} */}
      <NavInicio />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
