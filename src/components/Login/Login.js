import React, { useState, useEffect } from "react";
import style from "./login.module.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import PNotify from "../Common/PNotify";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AxiosPost } from "../Common/Axios";
import { EncryptToken } from "../Common/Encrypt";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import swal from "sweetalert";

function Login() {
  document.body.style.background = "rgb(244,245,246)";
  const [data, setData] = useState({
    username: "",
    password: "",
    checked: false,
  });
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  function handleChange(e) {
    let name = e.target.name;
    let value;
    if (name === "checked") value = e.target.checked;
    else value = e.target.value;

    setData({ ...data, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Login submit called");
    let body = { ...data, checked: undefined };

    async function handleSuccess(res) {
      if (res.data.token) {
        let encryptedToken = await EncryptToken(res.data.token);
        document.cookie = `token=${encryptedToken};`;
        history.push("/admin");
        setLoading(false);
      }
    }
    async function handleErr(err) {
      swal("Authentication Failed", "", "error");
      setLoading(false);
    }
    AxiosPost("/api/v1/token/authorize", body, handleSuccess, handleErr);
  }
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1em 0",
        boxSizing: "border-box",
      }}
    >
      <Row>
        <Col>
          <Card
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 16px 0px" }}
            className={"mx-auto " + style.logincard}
          >
            <Loader active={loading}>
              {/* <Card.Img variant="top" src={Logo} /> */}
              <Card.Header bg="info" className="text-center">
                <span style={{ fontSize: "1.5rem" }}>Sign In</span>
                {/* <AccountCircleIcon style={{fontSize:'2rem'}}/> */}
              </Card.Header>
              <Card.Body>
                <br />
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter Username"
                    variant="outlined"
                    className="mb-3"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    required={true}
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter Password"
                    variant="outlined"
                    className="mb-3"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required={true}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.checked}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Row className="justify-content-center">
                    <Button variant="contained" color="primary" type="submit">
                      Sign In
                    </Button>
                  </Row>
                  <Row className="mt-2">
                    <Col sm="8">
                      <Link to="/">Forgot Password?</Link>
                    </Col>
                    {/* <Col sm="8">
                      <Link to="/">Register</Link>
                    </Col> */}
                  </Row>
                </form>
              </Card.Body>
            </Loader>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
