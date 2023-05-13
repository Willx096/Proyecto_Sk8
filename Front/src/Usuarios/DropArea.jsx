import GlobalContext from "../GlobalContext";
import React, { useState, useContext } from 'react';

const DropArea = ({ eventoid}) => {
    const { userid, token } = useContext(GlobalContext);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState([]);
  const [preview2, setPreview2] = useState('');
  
  //cuando no se arrastra
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  //cuando se arrastra
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  //cuando se suelta el archivo ?¿
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files[0];
    const prevArray = [...preview, URL.createObjectURL(files)]
    setPreview(prevArray);
    setPreview2(URL.createObjectURL(files));
    uploadFile(files);
  };

  const usuario = {
    id_usuario: userid,
    id_evento: eventoid,
    
  };

  //funcion para subir la foto donde tambien se le pasa id necesarias 
  function uploadFile(files) {
    const data = new FormData()
    data.append("id_usuario", usuario.id_usuario);
    data.append("id_evento", usuario.id_evento);
    data.append('files', files);
      
    const options = {
      method: "POST",
      body: data
    }

    fetch("http://localhost:5000/api/participacion/subir-fotos", options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(cosa => console.log(cosa))

  }

  return (
    <>
    {/* visualizacion de las imagenes cargadas */}
    {preview.map((el,idx) => (
      <div key={idx} className="imagenesSubidas" >
          <img  src={el} style={{ width: 100 }} />
        </div>
    ))}
    {/* zona donde se dipositan las imagenes */}
    <div className="dropArea"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      
    >
      {/* mientras se arrastra */}
      {dragging ? (
        <div style={{ textAlign: 'center' }}>Suelta la imagen.</div>
      ) : (
        <div style={{ textAlign: 'center' }}>Arrastra la imagen hasta aquí.</div>
      )}
     
    </div>
    
    </>
    
  );
};

export default DropArea;