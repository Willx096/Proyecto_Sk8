import React from "react";
import { useState, useEffect } from "react";
import {Table} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Perfil() {

  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);

  function cargarPerfil() {
//cuando tengamos el login podremos poner con el context {id} en vez de poner directamente el 1
    fetch("http://localhost:5000/api/usuarios/1")
      .then((resultado) => resultado.json())
      .then((resultado2) => {
        if (resultado2.ok === true) {
          setDatos(resultado2.data);
        } else {
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
  
    cargarPerfil();
}, [])


  return <>
  <Card style={{ width: '80rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{datos.nombre}</Card.Title>
        <Card.Text>
          {datos.descripcion}
        </Card.Text>
        <Button variant="primary">Editar</Button>
      </Card.Body>
    </Card>
 
  </>;
}

export default Perfil;
