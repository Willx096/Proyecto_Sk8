import React from "react";
import { Container, Col, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-center text-white">
        <div className="container p-5 pb-0">
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-1">
                  <strong>
                    Para cualquier incidencia contacte a este email:
                  </strong>
                </p>
              </div>

              <div className="col-auto">
                <div className="form-outline form-white mb-4">
                  <p className="pt-1">skateZone@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-2 bg-dark">
          © 2023 Copyright:
          <a className="text-white" href="https://skatezone.com/">
            SkateZone
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
