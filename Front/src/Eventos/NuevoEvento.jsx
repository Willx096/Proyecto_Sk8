import React, { useState } from "react";
import {Form, Col, Row, Button,} from  'react-bootstrap';




function NuevoEvento(props) {

  const [event, setEvento] = useState ({
   
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    latitud: "",
    nivel: "",
    participantes: "",
    foto: "",

  })


  return (
   
    <Row>
      <Col md={4}>      
   <Form className="form">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label >Titulo</Form.Label>
      <Form.Control type="title" placeholder="Inserta un titulo" />
      <Form.Label>Participantes</Form.Label>
      <Form.Select aria-label="Default select example">
      <option>Seleccióna el número de participantes</option>
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
      <Form.Control type="level" placeholder="Introduce el correo" />
      <Form.Label>Lugar</Form.Label>
      <Form.Control type="lugar" placeholder="Introduce el correo" />
      {/* <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text> */}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Fecha</Form.Label>
      <Form.Control type="date" placeholder="Contraseña" />      
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>      
       <Button variant="primary" type="submit">
     Crear
    </Button>
  </Form>  
     </Col>
    </Row>
  
 
  )
  
  }


export default NuevoEvento;
