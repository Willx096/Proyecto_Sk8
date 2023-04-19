import React, { useState } from "react";
import Button from "react-bootstrap/Button";


function Eliminar() {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function eliminarUsuario(e) {
  
    e.preventDefault();
    
    const usuario = {
      nombre,
      descripcion
    };

    const URL = "http://localhost:5000/api/usuarios/1";
    var myHeaders = new Headers();


    var requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => {
        response.json()
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => console.log("error", error));

    setNombre("");
    setDescripcion("");
  }

//NECESITO Q ME REDIRIGA A OTRA PAGINA


  return (
    <>
      <Button variant="primary" onClick={eliminarUsuario}>
        Eliminar
      </Button>

    </>
  );
}

export default Eliminar;
