import GlobalContext from "../GlobalContext";
import React, { useState, useContext } from 'react';

const DropArea = ({ eventoid}) => {
    const { userid, token } = useContext(GlobalContext);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState([]);
  const [preview2, setPreview2] = useState('');
  

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files[0];
    const prevArray = [...preview, URL.createObjectURL(files)]
    setPreview(prevArray);
    setPreview2(URL.createObjectURL(files));
    console.log(prevArray)

    console.log(files)
    uploadFile(files);
  };
  const usuario = {
    id_usuario: userid,
    id_evento: eventoid,
    
  };

  function uploadFile(files) {
    const data = new FormData()
    data.append("id_usuario", usuario.id_usuario);
    data.append("id_evento", usuario.id_evento);
    data.append('files', files);
    data.append("mensaje", "xxxxx");
    
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

  const uploadFilexxx = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    try {
      const response = await fetch('/api/participacion/subir-fotos', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {preview.map((el,idx) => (
      <div key={idx}  className="box">
          <img src={el} style={{ width: 100 }} />
        </div>
    ))}
    <div className="box drop"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      
    >
      {dragging ? (
        <div style={{ textAlign: 'center' }}>Drop the file here</div>
      ) : (
        <div style={{ textAlign: 'center' }}>Drag and drop file here</div>
      )}
     
    </div>
    
    </>
    
  );
};

export default DropArea;