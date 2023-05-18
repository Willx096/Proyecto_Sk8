import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram, faFacebook} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <footer className="bg-light text-center text-lg-start">
        <div className="container p-2">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contaco</h5>
              <p>62739839</p>
              <p>skateZone@gmail.com</p>
            </div>
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Redes</h5>
              <a>{/* <FontAwesomeIcon icon={faInstagram} /> */}</a>
              <a href="">{/* <FontAwesomeIcon icon={faFacebook} /> */}</a>
              <a href="">{/* <FontAwesomeIcon icon={faLinkedIn} /> */}</a>
              <a href="">{/* <FontAwesomeIcon icon={faGitHub} />{" "} */}</a>
            </div>
          </div>
        </div>

        <div className="text-center p-3">
          © 2023 Copyright:
          <a className="text-dark" href="#">
            Sk8Zone
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
