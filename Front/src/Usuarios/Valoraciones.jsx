import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GlobalContext from "../GlobalContext";

function Valoraciones({ eventoid }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userid, token } = useContext(GlobalContext);

  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  // const [refresh, setRefresh] = useState(0);
  const [valoracion, setValoracion] = useState("");
  const [puntuacion, setPuntuacion] = useState("");
  const [lafoto, setLafoto] = useState();
  //Funcion para guardar valoracion
  // function Valorar() {
  //   var raw = JSON.stringify({

  //     puntuacion: puntuacion,
  //     valoracion: valoracion,
  //     id_evento: eventoid,
  //     id_usuario: userid
  //   })
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", authorization: token },
  //     body: raw,
  //   };

  //     fetch(`http://localhost:5000/api/participacion/usuario/${userid}/evento/${eventoid}`, requestOptions)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       if (data.ok === true) {
  //         setDatos(data.data);
  //       } else {
  //         setError(data.error);
  //       }
  //     })
  //     .catch((error) => setError(error));
  // }

  

  function Valorar(e) {

    e.preventDefault();

    const usuario = {
      puntuacion,
      valoracion,
      id_usuario: userid,
      id_evento: eventoid,
      lafoto,
    };
    
    var formData = new FormData();
    formData.append("puntuacion", usuario.puntuacion);
    formData.append("valoracion", usuario.valoracion);
    formData.append("id_usuario", usuario.id_usuario);
    formData.append("id_evento", usuario.id_evento);
    formData.append("file", usuario.lafoto);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
console.log(requestOptions.body)
    fetch(
      `http://localhost:5000/api/participacion/usuario/${userid}/evento/${eventoid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // setRefresh(refresh + 1);

        setShow(false);
      })
      .catch((error) => console.log("error", error));
  }

  // useEffect(() => {
  //   Valorar();
  // }, [refresh]);

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
              {/* <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onInput={(e) => setLafoto(e.target.files[0])}
              /> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onInput={(e) => setLafoto(e.target.files[0])}
              />
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
