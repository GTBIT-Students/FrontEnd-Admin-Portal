import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FaUniversity } from "react-icons/fa";
import { GoLink } from "react-icons/go";

function MainFooter() {
    return (
        <Container fluid className="bg-dark" >
        <Row className=" my-2 justify-content-center">
            <Col sm="8" xs="12" className="border border-secondary text-center text-danger my-2">
               Something about GTBIT should be written here...
            </Col>
        </Row>
           <Row >
               <Col sm="6" className="border">
                   <Row>
                       <Col sm="12">
                           <h5 className="text-center">
                           <Link to='/about' className="text-warning">
                           About GTBIT&nbsp;<FaUniversity/>
                           </Link>
                           </h5>
                       </Col>
                       <Col sm="12">
                       <h6 className="text-center">
                           <Link to='/' className="text-light">
                           GGSIPU
                           </Link>
                           </h6>
                       </Col>
                       <Col sm="12">
                           <h6 className="text-center">
                             <Link to='/' className="text-light">
                            Contact Us
                           </Link>
                           </h6>
                       </Col>
                       <Col sm="12">
                            <h6 className="text-center">
                             <Link to='/' className="text-light">
                            Mandatory Disclosure
                            </Link>
                           </h6>
                       </Col>
                   </Row>
               </Col>
               <Col sm="3" className="border">
               <Row>
                       <Col sm="12">
                           <h5 className="text-center">
                           <Link to='/' className="text-danger">
                          Quick Links <GoLink/>
                           </Link>
                           </h5>
                       </Col>
                       <Col sm="12">
                       <h6 className="text-center">
                           <Link to='/' className="text-light">
                           My Account
                           </Link>
                           </h6>
                       </Col>
                       <Col sm="12">
                           <h6 className="text-center">
                             <Link to='/' className="text-light">
                            Register
                           </Link>
                           </h6>
                       </Col>
                   </Row>
               </Col>
               <Col sm="3" className="border">
                <Row>
                  <Col sm="12">
                      <h3 className="text-center bg-secondary">
                          Other stuff here
                      </h3>
                  </Col>
                </Row>
               </Col>
           </Row> 
        <Row className=" my-2 justify-content-center">
            <Col sm="8" xs="12" className="border border-secondary text-center text-white my-2">
             Copyright Disclaimer contetnt here
            </Col>
        </Row>
        </Container>
    )
}

export default MainFooter
