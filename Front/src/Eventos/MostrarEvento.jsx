import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function MostrarEvento({ evento }) {
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      evento,
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/eventos", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });

  return (
    <Container>
      <Card></Card>
    </Container>
  );
}

export default MostrarEvento;
