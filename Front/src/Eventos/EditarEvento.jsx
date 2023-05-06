import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import GlobalContext from "../GlobalContext";
import { useParams } from "react-router-dom";


function EditarEvento({ datosE, refresh, setRefresh }) {
  const {  userid } = useContext(GlobalContext);
  const { eventoId } = useParams();


  //Parametros para mostar o no el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  console.log("comprovando datosE", datosE);
  const [evento, setEvento] = useState({
    titulo: datosE ? datosE[0].titulo : "",
    descripcion: datosE ? datosE[0].descripcion : "",
    fecha: datosE ? datosE[0].fecha : "",
    hora: datosE ? datosE[0].hora : "",
    direccion: datosE ? datosE[0].direccion : "",
    nivel: datosE ? datosE[0].nivel : "",
    participantes: datosE ? datosE[0].participantes : "",
  });

  console.log(evento.titulo);

  function editarEvento(e) {
    e.preventDefault();

    const nuevoEvento = {
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      direccion: evento.direccion,
      nivel: evento.nivel,
      participantes: evento.participantes,
    };

    console.log("nuevo evento", nuevoEvento);

    const URL = `http://localhost:5000/api/eventos/${eventoId}`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      titulo: nuevoEvento.titulo,
      descripcion: nuevoEvento.descripcion,
      fecha: nuevoEvento.fecha,
      hora: nuevoEvento.hora,
      latitud: nuevoEvento.latitud,
      longitud: nuevoEvento.longitud,
      direccion: nuevoEvento.direccion,
      nivel: nuevoEvento.nivel,
      participantes: nuevoEvento.participantes,
    //   id_usuario: userid,
    });

    var requestOptions = {
      method: "PUT",
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
              <Form.Label>Tiutulo</Form.Label>
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
                onInput={(e) => setEvento({ ...evento, fecha: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <FormControl
                type="text"
                value={evento.direccion}
                onInput={(e) =>
                  setEvento({ ...evento, direccion: e.target.value })
                }
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Nivel</Form.Label>
              <FormControl
                type="text"
                value={evento.nivel}
                onInput={(e) => setEvento({ ...evento, nivel: e.target.value })}
              >
                <option>Selecciona el Nivel</option>
                <option>Principante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </FormControl>
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
            </Form.Group> */}
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
