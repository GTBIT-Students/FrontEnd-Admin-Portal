import React from 'react'
import Logo from '../../Image/GTBITlogo.png'
import style from './middlebar.module.css'
import {Link } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

function MiddleBar() {
    return (<Container fluid className={style.mbarcontainer}>
        <Row>
        <Col xs="3" sm="2" className="pr-0">
           <Link to="/">
            <Image className={style.img} src={Logo} fluid/>

           </Link>

        </Col>
        <Col xs="8" sm="10">
            <Row>
                <Col sm="12"><h1 className={style.h1 +' display-5'}>
                Guru Tegh Bahadur Institute Of Technology
                </h1>
                </Col>
                    
                <Col sm="12">
               <p className={style.p}>
               Affliated to Guru Gobind Singh Indraprastha University, New Delhi
               </p>
                   
                </Col>
            </Row>
        </Col>
        </Row>
        </Container>
    )
}

export default MiddleBar