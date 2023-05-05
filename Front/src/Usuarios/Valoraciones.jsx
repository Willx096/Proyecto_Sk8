import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GlobalContext from "../GlobalContext";
import FotosEvento from "../Usuarios/FotosEvento";

function Valoraciones({ eventoid, cargarPerfil }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userid, token } = useContext(GlobalContext);

  const [error, setError] = useState(false);
  const [valoracion, setValoracion] = useState("eidur");
  const [puntuacion, setPuntuacion] = useState(3);
  const [refresh, setRefresh] = useState(0);
  const [fotos, setFotos] = useState([]);

  //Funcion para guardar valoracion
  function Valorar(e) {
    e.preventDefault();
    var raw = JSON.stringify({
      puntuacion: puntuacion,
      valoracion: valoracion,
    });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: token },
      body: raw,
    };

    fetch(
      `http://localhost:5000/api/participacion/usuario/${userid}/evento/${eventoid}/valoracion`,
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.ok === true) {
          console.log("Respuesta del servidor:", data);
          setRefresh(refresh + 1);
          setShow(false);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    cargarPerfil();
  }, [refresh]);

  function showFotos() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    fetch(`http://localhost:5000/api/fotos-eventos`, requestOptions)
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setFotos(resultado2.data);
          
        } else {
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }

  const foto = fotos.map((el, index) => (
    <tr key={index}>
      <td>
        {
          <img
            src={"http://localhost:5000/" + el.fotos}
            style={{ width: 100 }}
            alt=""
          />
        }
      </td>
    </tr>
  ));
  console.log(foto);

  useEffect(() => {
    showFotos();
  }, [refresh]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Valorar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valoración del evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Puntuacion</Form.Label>
              <Form.Select
                required
                value={puntuacion}
                onInput={(e) => setPuntuacion(e.target.value)}
                type="text"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Valoracion</Form.Label>
              <Form.Control
                type="textarea"
                value={valoracion}
                onInput={(e) => setValoracion(e.target.value)}
              />
            </Form.Group>
            <FotosEvento showFotos={showFotos} eventoid={eventoid} />
            <Form.Group>
              <Form.Label>{foto}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Valorar}>
            Valorar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Valoraciones;
