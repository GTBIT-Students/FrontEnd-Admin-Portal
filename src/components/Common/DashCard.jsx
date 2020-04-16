import React from "react";
import { Row, Col } from "react-bootstrap";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SystemUpdateIcon from "@material-ui/icons/SystemUpdate";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";

function DashCard({ heading, bgcolor ,icon}) {
  return (
    <>
      <Card elevation={3} style={{ backgroundColor: '#adb5bd' }}>
        <CardContent className="pb-0">
          <Row className="justify-content-center">
            <Col className="col-auto p-3 border d-flex align-items-center justify-content-center rounded-circle"
            style={{ backgroundColor:'#d1e0eefc' }}
            >
              {icon}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-2">
              <Typography variant="p" component="h3">
                {heading}
              </Typography>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-auto">
              <Button>
                <ArrowForwardIcon style={{ width: "3rem", height: "3rem" }} />
              </Button>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </>
  );
}

export default DashCard;
