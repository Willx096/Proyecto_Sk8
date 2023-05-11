import React, { useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import MapView from "../mapa/MapView";
import "leaflet/dist/leaflet.css";
import "../mapa/leaflet.css";
import GlobalContext from "../GlobalContext";

function NuevoEvento(props) {
  const { userid, token } = useContext(GlobalContext);

  const formularioOk = () => toast.success("Evetno creado");
  const formularioBad = () => toast.error("Evetno no creado");

  const [direccion, setDireccion] = useState("");
  //Validate para validar que los campos se han rellenado
  const [validated, setValidated] = useState(false);
  const fechaActual = new Date().toISOString().split("T")[0];
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    fecha: fechaActual,
    hora: "",
    direccion: "",
    latitud: 0,
    longitud: 0,
    nivel: "",
    participantes: "",
  });

  useEffect(() => {
    console.log("direccion completa", direccion);
    setEvento({
      ...evento,
      direccion: direccion.display_name,
      longitud: direccion.lon * 1,
      latitud: direccion.lat * 1,
    });
  }, [direccion]);

  function CrearEvento(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (evento.fecha < fechaActual) {
      console.log("fecha esta mal");
      formularioBad();
      return;
    }
    var raw = JSON.stringify({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      latitud: evento.latitud,
      longitud: evento.longitud,
      direccion: evento.direccion,
      nivel: evento.nivel,
      participantes: evento.participantes,
      id_usuario: userid,
      // foto: evento.foto,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/eventos", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        setEvento({
          titulo: "",
          descripcion: "",
          fecha: fechaActual,
          hora: "",
          direccion: "",
          latitud: 0,
          longitud: 0,
          nivel: "",
          participantes: "",
        });
      })
      .catch((error) => console.log("error", error));
    formularioOk();
    setValidated(true);
  }

  return (
    <Container fluid="lg">
      {/* className="image" demomento */}
      <Row>
        <h3>Crear un nuevo evento</h3>
        {/*deberiamos pensar un titulo o dejar este que indica que esta pantalla  */}
      </Row>
      <Row>
        <Col>
          <Form noValidate validated={validated} onSubmit={CrearEvento}>
            <Row md={2}>
              <Form.Group className="mb-3" controlId="formBasicEmail" as={Col}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  value={evento.titulo}
                  onInput={(e) =>
                    setEvento({ ...evento, titulo: e.target.value })
                  }
                  type="text"
                  placeholder="Inserta un titulo"
                />
                <Form.Label>Participantes</Form.Label>
                <Form.Select
                  value={evento.participantes}
                  onInput={(e) =>
                    setEvento({ ...evento, participantes: e.target.value })
                  }
                  type="number"
                  aria-label="Default select example"
                >
                  <option>Selecciona el número de participantes</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Select>
                <Form.Label>Nivel</Form.Label>
                <Form.Select
                  value={evento.nivel}
                  onInput={(e) =>
                    setEvento({ ...evento, nivel: e.target.value })
                  }
                  type="text"
                  aria-label="Default select example"
                >
                  <option>Selecciona el Nivel</option>
                  <option>Principante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="validationCustom02">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    value={evento.fecha}
                    min={fechaActual}
                    onInput={(e) =>
                      setEvento({ ...evento, fecha: e.target.value })
                    }
                    type="date"
                    placeholder="Contraseña"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    No puedes crear un evento con fechas que ya han pasado!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    value={evento.hora}
                    onInput={(e) =>
                      setEvento({ ...evento, hora: e.target.value })
                    }
                    type="time"
                    rows={3}
                  />
                </Form.Group>
              </Form.Group>
              <Row size={2}>
                <MapView direccion={direccion} setDireccion={setDireccion} />
              </Row>
            </Row>
            <br></br>
            <Row md={2}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  value={evento.descripcion}
                  onInput={(e) =>
                    setEvento({ ...evento, descripcion: e.target.value })
                  }
                  type="text"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={evento.direccion}
                  onInput={(e) =>
                    setEvento({ ...evento, direccion: e.target.value })
                  }
                  type="text"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Crear
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default NuevoEvento;
