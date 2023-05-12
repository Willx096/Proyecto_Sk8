import React, { useContext, useState, useEffect } from "react";
import {Button,Form,FormControl,Modal, Row} from "react-bootstrap";
import { useParams } from "react-router-dom";

function EditarEvento({ refresh, setRefresh, eventoId, eventos}) {

  //Parametros para mostar o no el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [titulo, setTitulo] = useState(eventos.titulo);
  const [descripcion, setDescripcion] = useState(eventos.descripcion);
  const [hora, setHora] = useState(eventos.hora);
  const [fecha, setFecha] = useState(eventos.fecha);
  const [nivel, setNivel] = useState(eventos.nivel);
  const [participantes, setParticipantes] = useState(eventos.participantes);
  
  const evento = {
    titulo,
    hora,
    fecha,
    nivel,
    descripcion,
    participantes,
  };

  function editarEvento(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const URL = `http://localhost:5000/api/eventos/${eventoId}`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(evento);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setRefresh(refresh + 1);
        setShow(false);
        setValidated(false);
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <Button variant="warning" onClick={handleOpen}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={editarEvento}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row xs={1} sm={2} md={2}>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <FormControl
              required
                type="text"
                value={titulo}
                // onInput={(e) => setEvento(e.target.value)}
                onInput={(e) =>
                  setTitulo(e.target.value)
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un nombre.
            </Form.Control.Feedback>
            </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Group >
              <Form.Label>Descripcion</Form.Label>
              <FormControl
              required
                type="text"
                value={descripcion}
                onInput={(e) =>
                  setDescripcion(e.target.value)
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un Apellido.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustomUsername">
              <Form.Label>Fecha</Form.Label>
              <FormControl
              required
                type="date"
                value={fecha}
                onInput={(e) => setFecha(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <FormControl
                type="time"
                value={hora}
                onInput={(e) => setHora(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Elige un nombre de usuario.
            </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <FormControl
                type="text"
                value={evento.direccion}
                onInput={(e) =>
                  setEvento({ ...evento, direccion: e.target.value })
                }
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nivel</Form.Label>
              <Form.Select
                type="text"
                value={nivel}
                onInput={(e) => setNivel(e.target.value)}
                required
              >
                <option>Selecciona el Nivel</option>
                <option>Principante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce un email.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Participantes</Form.Label>
              <Form.Select
              required
                type="number"
                value={participantes}
                onInput={(e) =>
                  setParticipantes(e.target.value)
                }
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Introduce fecha de nacimiento.
            </Form.Control.Feedback>
            </Form.Group>
            </Form.Group>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditarEvento;
