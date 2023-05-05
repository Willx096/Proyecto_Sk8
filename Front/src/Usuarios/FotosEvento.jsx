import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
import GlobalContext from "../GlobalContext";

function FotosEvento({ eventoid, showFotos }) {
  const { userid, token } = useContext(GlobalContext);
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(0);

  function SubirFoto(e) {
    e.preventDefault();

    const usuario = {
      id_usuario: userid,
      id_evento: eventoid,
      files,
    };

    var formData = new FormData();
    formData.append("id_usuario", usuario.id_usuario);
    formData.append("id_evento", usuario.id_evento);
    formData.append("files", usuario.files);
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("files", files[i]);
    // }
    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/participacion/subir-fotos", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setRefresh(refresh + 1)
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    showFotos();
  }, [refresh]);

  return (
    <Form>
      <Form.Group>
                            <Form.Label>Imagen</Form.Label>
              <Form.Control name="files"
                type="file" 
                onInput={(e) => setFiles(e.target.files[0])}
              />
                
            </Form.Group>
            <Button variant="primary" onClick={SubirFoto}>
            Valorar
          </Button>
    </Form>
      
   
  );
}

export default FotosEvento;
