import { Routes, Route } from "react-router-dom";
import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";
import ListaUsuarios from "./Usuarios/ListaUsuarios"
import { useState, useEffect} from "react";
import {useNavigate } from "react-router-dom"
import NavUsuario from "./Navs/NavUsuario";
import "./App.css";
import Login from "./Login";


//Context para poder cambiar id mientras no hay login
import GlobalContext from "./GlobalContext";
import jwt_decode from "jwt-decode";
import { Container } from "react-bootstrap";
import PerfilEvento from "./Eventos/PerfilEvento";
function App() {

  //prueba 1 version login
  //usestates
  const [mostrarLogin, setMostrarLogin] = useState(false); 
  const [error, setError] = useState([]); 
  const [token, setToken] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [userid, setUserid] = useState(''); 
  const [admin, setAdmin] = useState(0); // Estado para almacenar si el usuario logueado tiene permisos de administrador o no

  
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
      setUserid(decoded.id); 
      setAdmin(decoded.admin || 0); // Almacena si el usuario tiene permisos de administrador o no
          } else {
      setUsername('');
      setAdmin(0); // Si no hay token, establece permisos de administrador a 0
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
    <GlobalContext.Provider value={{username,userid,admin, token, setMostrarLogin, logout, handleLogin, mostrarLogin}}>
      <NavUsuario />
      <Container>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/perfil-evento" element={<PerfilEvento />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/lista-usuarios" element={<ListaUsuarios />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      </Container>
      <Login handleLogin={handleLogin} showLogin={mostrarLogin} setShowLogin={setMostrarLogin} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
