import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button, Card} from "react-bootstrap";
import Eliminar from "./Eliminar";
import GlobalContext from "../GlobalContext";
import Editar from "./EditarPerfil";
import Valoraciones from "./Valoraciones";

import { useParams } from "react-router-dom";

function Perfil() {
  const { userid, token } = useContext(GlobalContext);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let { usuarioId } = useParams();

  //Funcion para datos del perfil
  function cargarPerfil() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    };

    fetch(
      `http://localhost:5000/api/usuarios/${usuarioId || userid}`,
      requestOptions
    )
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
  }, [refresh,usuarioId]);
  //cada vez que cambia el valor de refresh se ejecuta cargarPerfil

  if (!datos) return <>...</>;

  //Constante que contiene la foto
  const foto = (
    <img
      src={"http://localhost:5000/" + datos.foto}
      style={{ width: 100 }}
      alt=""
    />
  );

  //valoracion media
  function valoMedia(puntuaciones) {
    if (!Array.isArray(puntuaciones) || puntuaciones.length === 0) {
      return null;
    }
    const sumaTotal = puntuaciones.reduce((total, valor) => total + valor, 0);
    const media = sumaTotal / puntuaciones.length;
    return media;
  }

  const fechaHoy = new Date();

  // Tabla de eventos creados
  //Eventos futuros
  const creadoFuture = datos.Eventos.filter(
    (el) => new Date(el.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => {
    return (
      <Card>
      <Card.Body><Card.Title key={index}>{el.titulo}</Card.Title>
        <Card.Text>{el.titulo}</Card.Text>
        <Card.Text>{el.fecha}</Card.Text>
        <Card.Text>{el.nivel}</Card.Text>
        <Card.Text>{el.participantes}</Card.Text>
        <Card.Text>{el.direccion}</Card.Text>
      </Card.Body>
    </Card>
      
    );
  });

  //Eventos pasados
  // const creadoPasado = datos.Eventos.filter(
  //   (el) => new Date(el.fecha).getTime() < fechaHoy.getTime()
  // ).map((el, index) => {
  //   //obtengo los valores de las puntuaciones
  //   const puntuaciones2 = el.Participacions.map((e) => e.puntuacion);
  //   //llamo a la funcion que calcula la media
  //   const media = valoMedia(puntuaciones2).toFixed(2);
  
  //   return (
  //     <tr key={index}>
  //       <td>{el.titulo}</td>
  //       <td>{el.fecha}</td>
  //       <td>{el.nivel}</td>
  //       <td>{el.participantes}</td>
  //       <td>{el.direccion}</td>
  //       <td>{media}</td>
  //     </tr>
  //   );
  // });

  // Tabla de eventos en los que se ha participado
  //Eventos futuros
  const participadoFuture = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() > fechaHoy.getTime()
  ).map((el, index) => {
    return(
    <Card>
      <Card.Body>
      <Card.Title key={index}>{el.Evento.titulo}</Card.Title>

        <Card.Text>{el.Evento.fecha}</Card.Text>
      <Card.Text>{el.Evento.nivel}</Card.Text>
      <Card.Text>{el.Evento.participantes}</Card.Text>
      <Card.Text>{el.Evento.direccion}</Card.Text>
      <Card.Text>{el.Usuario.nombre}</Card.Text>
      <Card.Text>{el.puntuacion}</Card.Text>
      <Card.Text></Card.Text>
   
      </Card.Body>
    </Card>
    
  )});

  //Eventos pasados
  const participadoPasado = datos.Participacions.filter(
    (el) => new Date(el.Evento.fecha).getTime() < fechaHoy.getTime()
  ).map((el, index) => {
    return(
   <Card sm={1}><Card.Body>
     <Card.Title key={index}>{el.Evento.titulo}</Card.Title>
<Card.Text>{el.Evento.fecha}</Card.Text>
<Card.Text>{el.Evento.nivel}</Card.Text>
<Card.Text>{el.Evento.participantes}</Card.Text>
<Card.Text>{el.Evento.direccion}</Card.Text>
<Card.Text>{el.Usuario.nombre}</Card.Text>
<Card.Text>{el.puntuacion}</Card.Text>
 
     {!el.puntuacion ? (
       <Valoraciones
         cargarPerfil={cargarPerfil}
         puntu={el.puntuacion}
         eventoid={el.Evento.id}
       />
     ) : (
       <>
         <p>Valorado</p>
       </>
     )}
  
 </Card.Body></Card>
   
  )});

  return (
  
      // <Container className="containerPerfilUsuario">
      //   <Row lg={12}>
      //   <Col  lg={6} xs={12} className="recuadrosPerfil">
      //   <div >{foto}</div>
      //   <div >
      //     {datos.nombre} {datos.apellido}
      //   </div>
      //   <div>{datos.nickname}</div>
      //   <div >{datos.descripcion}</div>
      //   <div>Nivel: {datos.nivel}</div>
      //   <div>Experiencia: {datos.experiencia} años</div>
      //   <div >{datos.contacto}</div>
       
      //     <div>
      //       <Editar perfil={datos} refresh={refresh} setRefresh={setRefresh} />
      //     </div>
       
      //     <div>
      //       <Eliminar />
      //     </div>
              
      //   </Col>
      //   <Col lg={6} xs={12} className="recuadrosPerfil">
     
          
      //       <h3>Eventos creados</h3>
            
      //           {creadoFuture}
      //           {/* {creadoPasado} */}
             
          
      //     </Col>
      //     </Row>
          
      //     <Row>
      //       <Col  className="recuadrosPerfil">
      //       <h3>Eventos en los que se ha participado</h3>
           
      //           {participadoFuture}
      //           {participadoPasado}
              
           
      //  </Col>
      //   </Row>
      // </Container>

<Container fluid className="base1">
  <Row className="base2">
    <Col lg={6} md={9} sm={1} className="datos">
      <Row>
        <Col>{foto}</Col>
        <Col>
        {datos.nombre} {datos.apellido}
        {datos.nickname}
        </Col>
      </Row>
      <Row>
      <Col>Nivel: {datos.nivel}
     </Col>
        <Col> Experiencia: {datos.experiencia} años</Col>
      </Row>
      <Row>
      <Col>{datos.descripcion}</Col>
        <Col>{datos.contacto}</Col>
      </Row>
    </Col>
    <Col lg={6} md={9} sm={1} className="pasticipado">
    <Row>participaciones</Row>
    <Row>{participadoPasado}</Row>
    
    
    </Col>
  </Row>
  <Row lg={12} md={9} sm={1} className="base2">
  {creadoFuture}
  </Row>
</Container>


  );
}

export default Perfil;
