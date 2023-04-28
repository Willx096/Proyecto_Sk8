import { Routes, Route } from "react-router-dom";
import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";

import { useState, useEffect} from "react";
import {useNavigate } from "react-router-dom"
import NavUsuario from "./Navs/NavUsuario";
import "./App.css";
import Login from "./Login";


//Context para poder cambiar id mientras no hay login
import GlobalContext from "./GlobalContext";

import jwt_decode from "jwt-decode";
function App() {
 


  //prueba 1 version login
  //usestates
  const [mostrarLogin, setMostrarLogin] = useState(false); 
  const [error, setError] = useState([]); 
  const [token, setToken] = useState(''); 
  const [username, setUsername] = useState(''); 
  
  //cuando no estas login
  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo('/')
  };

  //token
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token); 
      setUsername(decoded.email); 
          } else {
      setUsername(''); 
    }
    goHome(); 
  }, [token])

  //funcion que permite iniciar sesion
  function handleLogin (email, pswd) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pswd }) 
    };

    fetch("http://localhost:5000/api/usuarios/login", requestOptions) 
      .then(response => {
        console.log("El primer then")
        return response.json()
      })
      .then(resp => {
        JSON.stringify(resp);
        if (resp.ok === true) {
          
          setToken(resp.token); 
          setMostrarLogin(false); 
        } else {
          console.log("No Oks")
          console.log("resp", resp)
          setError(resp.msg); 
        }
      })
      .catch(e => setError(e))
  };

  //cerrar sesion
  function logout() {
    setToken('');
    goHome();
  }

  return (
    <>
    <GlobalContext.Provider value={{username, token, setMostrarLogin, logout, handleLogin, mostrarLogin}}>
      <NavUsuario />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      <Login handleLogin={handleLogin} showLogin={mostrarLogin} setShowLogin={setMostrarLogin} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
