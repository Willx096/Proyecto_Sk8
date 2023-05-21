import React, { useContext, useState, useEffect } from "react";
import { Button, Form, FormControl, Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { API_URL } from "../apiConfig.js";

function EditarEvento({ refresh, setRefresh, eventoId, eventos }) {
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
  const formularioOk = () => toast.success("Evento editado!");
  const formularioBad = () => toast.error("Evento no editado");

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
      formularioBad();
      return;
    }

    const URL = API_URL+`eventos/${eventoId}`;

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
        formularioOk();
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <Button variant="outline-secondary" onClick={handleOpen}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={editarEvento}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bodyModal">
            <Row xs={1} sm={1} md={1}>
              <Form.Group>
                <Form.Label>Titulo del evento</Form.Label>
                <FormControl
                  required
                  type="text"
                  value={titulo}
                  onInput={(e) => setTitulo(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <FormControl
                    required
                    as="textarea"
                    type="text"
                    value={descripcion}
                    onInput={(e) => setDescripcion(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Este campo es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
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

                  <Form.Control.Feedback type="invalid">
                    Este campo es obligatorio..
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nivel mínimo</Form.Label>
                  <Form.Select
                    type="text"
                    value={nivel}
                    onInput={(e) => setNivel(e.target.value)}
                    required
                  >
                    <option>Selecciona el Nivel</option>
                    <option>Todos</option>
                    <option>Principante</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    Este campo es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Participantes</Form.Label>
                  <Form.Select
                    required
                    type="number"
                    value={participantes}
                    onInput={(e) => setParticipantes(e.target.value)}
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

                  <Form.Control.Feedback type="invalid">
                    Este campo es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="outline-secondary" type="submit">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
        <ToastContainer/>
      </Modal>
    </>
  );
}

export default EditarEvento;
