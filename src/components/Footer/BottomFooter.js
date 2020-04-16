import React from 'react'
import { Container, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
function BottomFooter() {
    return (
        <Container style={{ background: "#d8d9d0" }} fluid>
            <Row className="justify-content-center">
    <div>MADE WITH <FaHeart style={{color:'red'}}/> BY WEB TEAM</div>
            </Row>
        </Container>
    )
}

export default BottomFooter
