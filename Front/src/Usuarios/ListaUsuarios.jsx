import React from "react";
import { useState, useEffect,useContext } from "react";
import {Table} from "react-bootstrap"
import GlobalContext from "../GlobalContext.js";


function ListaUsuarios() {

  const { token } = useContext(GlobalContext);
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);


  function cargarPerfil() {

    fetch("http://localhost:5000/api/usuarios")
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

const Perfil = datos.map((e, idx) => {
  return (
      <tr key={idx}>
          <td>{e.id}</td>
          <td>{e.nombre}</td>
          <td>{e.email}</td>
      </tr>)
});


  return <>
  <div>Perfil</div>
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