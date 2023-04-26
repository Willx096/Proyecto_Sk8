
import { Container,Navbar,Nav,NavDropdown,} from "react-bootstrap";
import { Routes, Route,Link } from "react-router-dom";

import Inicio from "./Inicio";
import Eventos from "./Eventos/Eventos";
import NuevoEvento from "./Eventos/NuevoEvento";
import Perfil from "./Usuarios/Perfil";
import Registro from "./Usuarios/Registro";
import MapView from "./mapa/MapView";
import "./App.css";

//Context para poder cambiar id mientras no hay login
import GlobalContext from "./GlobalContext";

function App() {

  const id = ("2")


  return (
    <div className="App">
    <GlobalContext.Provider value={{id}}>
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav className="me-auto">
                {/* <Link to="/" className="nav-link">
                  Inicio
                </Link> */}
                <Link to="/eventos" className="nav-link">
                  Eventos
                </Link>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  menuVariant="dark"
                  title="Usuarios"
                >
                  <Link className="dropdown-item" to="/perfil">
                    Perfil
                  </Link>
                  <Link className="dropdown-item" to="/nuevo-evento">
                    Crear Evento
                  </Link>
                </NavDropdown>
                <Link to="/registro" className="nav-link">
                  Registro
                </Link>
                {/* <Link to="/mapa" className="nav-link">
                  Mapa
                </Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/nuevo-evento" element={<NuevoEvento />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/registro" element={<Registro />} />
          {/* <Route path="/mapa" element={<MapView />} /> */}
        </Routes>
      </Container>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
