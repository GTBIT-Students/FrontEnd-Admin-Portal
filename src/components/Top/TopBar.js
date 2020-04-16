import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdMail } from "react-icons/md";
function TopBar() {
  return (
    <div>
      <Container fluid style={{ background: "#d8d9d0" }}>
        <Row className="pb-2">
          <Col sm="5" md="6">
            <Row>
              <Col xs={{span:2,offset:0}} 
              //sm={{span:12,offset:1}}
              >
                GTBIT
              </Col>
              <Col xs={{span:10,offset:0}} 
              //sm={{span:12,offset:1}}
              >
                | GURU TEGH BAHADUR INSTITUTE{" "}
              </Col>
            </Row>
          </Col>

          <Col sm={{span:3,offset:4}} md={{span:6,offset:0}} className="d-flex justify-content-around">
            <FaFacebook className="h-auto" />
            <FaTwitter className="h-auto" />
            <FaLinkedinIn className="h-auto" />
            <MdMail className="h-auto"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TopBar;
