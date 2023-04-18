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
      <Form.Control type="title" placeholder="Introduce el nombre" />
      <Form.Label>Participantes</Form.Label>
      <Form.Control type="participantes" placeholder="Introduce el apellido" />
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
