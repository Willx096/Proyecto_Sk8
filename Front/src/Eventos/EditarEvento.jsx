import React, { useContext, useState, useEffect } from "react";
import {Button,Form,FormControl,Modal,ModalBody,ModalFooter,ModalHeader,ModalTitle,} from "react-bootstrap";
import { useParams } from "react-router-dom";

function EditarEvento({ refresh, setRefresh, useEvento }) {
  const { eventoId } = useParams();

  //Parametros para mostar o no el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [evento, setEvento] = useEvento;

  console.log(evento.titulo);

  function editarEvento(e) {
    e.preventDefault();

    console.log("Evento editado", evento);

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
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <Button variant="warning" onClick={handleOpen}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Editar Evento</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <FormControl
                type="text"
                value={evento.titulo}
                // onInput={(e) => setEvento(e.target.value)}
                onInput={(e) =>
                  setEvento({ ...evento, titulo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion</Form.Label>
              <FormControl
                type="text"
                value={evento.descripcion}
                onInput={(e) =>
                  setEvento({ ...evento, descripcion: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <FormControl
                type="date"
                value={evento.fecha}
                onInput={(e) => setEvento({ ...evento, fecha: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <FormControl
                type="time"
                value={evento.hora}
                onInput={(e) => setEvento({ ...evento, hora: e.target.value })}
              />
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
            <Form.Group>
              <Form.Label>Nivel</Form.Label>
              <Form.Select
                type="text"
                value={evento.nivel}
                onInput={(e) => setEvento({ ...evento, nivel: e.target.value })}
              >
                <option>Selecciona el Nivel</option>
                <option>Principante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Participantes</Form.Label>
              <Form.Select
                type="number"
                value={evento.participantes}
                onInput={(e) =>
                  setEvento({ ...evento, participantes: e.target.value })
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
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editarEvento}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditarEvento;
