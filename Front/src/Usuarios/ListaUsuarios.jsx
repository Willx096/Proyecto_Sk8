import React from "react";
import { useState, useEffect,useContext } from "react";
import {Table} from "react-bootstrap"
import GlobalContext from "../GlobalContext.js";


function ListaUsuarios() {

  const { token } = useContext(GlobalContext);
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);


  function cargarPerfil() {

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    fetch("http://localhost:5000/api/usuarios", requestOptions)
      .then((data) => data.json())
      .then((data) => {
        if (data.ok === true) {
          setDatos(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
  
    cargarPerfil();
}, [])

const Perfil = datos.map((e, idx) => {
  return (
      <tr key={idx}>
          <td>{e.id}</td>
          <td>{e.nombre}</td>
          <td>{e.email}</td>
      </tr>)
});


  return <>
  <div><h3>Lista de usuarios de Sk8tea</h3></div>
  <Table>
  <thead>
   <tr> 
    <th>id</th>
    <th>nombre</th>
    <th>email</th>
   </tr>
  </thead>
  <tbody>
    {Perfil}
  </tbody>
  </Table>
  </>;
}

export default ListaUsuarios;