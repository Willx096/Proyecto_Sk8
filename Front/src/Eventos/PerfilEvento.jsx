import React from "react";
import { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import GlobalContext from "../GlobalContext";

function PerfilEvento() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  //para que cuando se actualizan los datos se vuelva a ejecutar el cargarPerfil
  const [refresh, setRefresh] = useState(0);

  //funcion que llama a los datos de la base de datos
  function CargarEvento() {
    
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };
    
    //cuando tengamos el login podremos poner con el context {id} en vez de poner directamente el 1
    fetch(`http://localhost:5000/api/eventos/`, requestOptions)
    .then((resultado) => resultado.json())
    .then((resultado2) => {
      if (resultado2.ok === true) {
        setDatos(resultado2.data);
        console.log(datos)
        } else {
          setError(resultado2.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    CargarEvento();
  }, [refresh]);
  //cada vez que cambia el valor de refresh se ejecuta cargarPerfil

  //para que antes de leer lo q sigue cargue los datos
  if (!datos) return <>...</>;

  //tabla de eventos creados
  const filas = datos.map((el, index) => (
    <tr key={index}>
      <td>{el.titulo}</td>
      <td>{el.descripcion}</td>
      <td>{el.fecha}</td>
      <td>{el.ubicacion}</td>
      <td>{el.nivel}</td>
      <td>{el.participantes}</td>
      <td>{el.Participacions[0].valoracion}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Informacion del evento</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Ubicacion</th>
            <th>Nivel</th>
            <th>Participantes</th>
            <th>Valoracion</th>
            <th>Creador</th>
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </Table>
    </div>
  );
}

export default PerfilEvento;
