//Componentes
import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";
import ListaUsuarios from "./Usuarios/ListaUsuarios";
import NavUsuario from "./Navs/Navbar";
import Login from "./Login";
//Estilo
import "./App.css";
//React
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PerfilEvento from "./Eventos/PerfilEvento";
//Para el login
import jwt_decode from "jwt-decode";
import GlobalContext from "./GlobalContext";
import MostrarEvento from "./Eventos/MostrarEvento";

function App() {
  //useStates
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState([]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [admin, setAdmin] = useState(0);
  const [nombreNav, setNombreNav] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [foto, setFoto] = useState("");

  //Navegación
  const navigateTo = useNavigate();

  const goHome = () => {
    navigateTo("/");
  };

  const goEventos = () => {
    navigateTo("/eventos");
  };

  //token
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUsername(decoded.email);
      setUserid(decoded.id);
      setNombreNav(decoded.nickname);
      setFoto(decoded.foto);
      setAdmin(decoded.admin || 0);
      goEventos();
    } else {
      setUsername("");
      setAdmin(0);
      goHome();
    }
  }, [token]);

  //Funcion para iniciar sesion
  function iniciaSesion(email, pswd) {


  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pswd }),
    };

    fetch("http://localhost:5000/api/usuarios/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        JSON.stringify(resp);
        if (resp.ok === true) {
          setToken(resp.token);
          setShowLogin(false);
          
        } else {
          console.log("resp", resp);
          setError(resp.msg);
        }
   
      })
      .catch((e) => setError(e));
  }

  //Funcion para cerrar sesion
  function logout() {
    setToken("");
    goHome();
  }

  return (
    
      <GlobalContext.Provider
        value={{
          showLogin,
          setShowLogin,
          username,
          userid,
          admin,
          token,
          nombreNav,
          logout,
          goHome,
          setShowRegister,
          showRegister,
          foto
        }}
      >
        <NavUsuario />
        <Container>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil-evento/:eventoId" element={<PerfilEvento />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/mostrar-evento/:id" element={<MostrarEvento />} />
            <Route path="/nuevo-evento" element={<NuevoEvento />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/:usuarioId" element={<Perfil />} />
            <Route path="/lista-usuarios" element={<ListaUsuarios />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Container>
        <Login
          iniciaSesion={iniciaSesion}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      </GlobalContext.Provider>
   
  );
}

export default App;
