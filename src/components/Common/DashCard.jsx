import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

function DashCard({ heading, bgcolor, icon, LinkTo }) {
  return (
    <>
      <Card elevation={3} style={{ backgroundImage: bgcolor }}>
        <CardContent className="pb-0">
          <Row className="justify-content-center">
            <Col
              className="col-auto p-3 border d-flex align-items-center justify-content-center rounded-circle"
              style={{ backgroundColor: "#e9ecef" }}
            >
              {icon}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-2">
              <Typography
                variant="inherit"
                component="h3"
                style={{ fontSize: "x-large" }}
              >
                {heading}
              </Typography>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-auto">
              <Link to={`/admin/${LinkTo}`}>
                <Button>
                  <ArrowUpwardIcon
                    style={{ width: "3rem", height: "3rem", opacity: ".8" }}
                  />
                </Button>
              </Link>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </>
  );
}

export default DashCard;
