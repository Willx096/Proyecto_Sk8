import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button, Card, } from 'react-bootstrap';
import MapView from "../mapa/MapView";
import 'leaflet/dist/leaflet.css';
import "../mapa/leaflet.css";



function NuevoEvento(props) {

 
  
  const [direccion, setDireccion] = useState ('')
  const [evento, setEvento] = useState({

    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    direccion: "",
    latitud: 0,
    longitud: 0,
    nivel: "",
    participantes: "",
    // foto: "",

  })

  useEffect(()=>{
    setEvento({ ...evento, direccion: direccion.display_name, longitud:direccion.lon*1, latitud:direccion.lat*1})
    
  }, [direccion])

  function CrearEvento(e) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
      // foto: evento.foto,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/eventos", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  return (

    <Row>
      <Col md={5}>
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Titulo</Form.Label>
            <Form.Control value={evento.titulo} onInput={(e) => setEvento({ ...evento, titulo: e.target.value })} type="text" placeholder="Inserta un titulo" />
            <Form.Label>Participantes</Form.Label>
            <Form.Select value={evento.participantes} onInput={(e) => setEvento({ ...evento, participantes: e.target.value })} type="number" aria-label="Default select example">
              <option>Selecciona el número de participantes</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
              <option value="3">6</option>
              <option value="3">7</option>
              <option value="3">8</option>
              <option value="3">9</option>
              <option value="3">10</option>
            </Form.Select>
            <Form.Label>Nivel</Form.Label>
            <Form.Select value={evento.nivel} onInput={(e) => setEvento({ ...evento, nivel: e.target.value })} type="text" aria-label="Default select example">
              <option>Selecciona el Nivel</option>
              <option value="principante">Principante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </Form.Select>
            {/* <Form.Label>Latitud</Form.Label>
      <Form.Control  value={evento.latitud} onInput={(e)=>setEvento({...evento,latitud:e.target.value})} type="number"  placeholder="Elige la ubicación" />
      <Form.Label>Longitud</Form.Label>
      <Form.Control  value={evento.longitud} onInput={(e)=>setEvento({...evento,longitud:e.target.value})} type="number"  placeholder="Elige la ubicación" /> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control value={evento.fecha} onInput={(e) => setEvento({ ...evento, fecha: e.target.value })} type="date" placeholder="Contraseña" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Hora</Form.Label>
            <Form.Control value={evento.hora} onInput={(e) => setEvento({ ...evento, hora: e.target.value })} type="time" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control value={evento.direccion} onInput={(e) => setEvento({ ...evento, direccion: e.target.value })}   type="text" as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripción</Form.Label>
            <Form.Control value={evento.descripcion} onInput={(e) => setEvento({ ...evento, descripcion: e.target.value })} type="text" as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={CrearEvento}>
            Crear
          </Button>
        </Form>
      </Col>
      <Col className="box">
         {/* <Card style={{ width: '18rem' }}>
      <Card.Body>
          <Card.Title>Consejo para crear un evento.</Card.Title>
          <Card.Text>
            
          </Card.Text>
          </Card.Body>
          </Card>   */}
      </Col>
      <Col>
        <MapView direccion={direccion} setDireccion={setDireccion} />
      </Col>

    </Row>




  )

}


export default NuevoEvento;
