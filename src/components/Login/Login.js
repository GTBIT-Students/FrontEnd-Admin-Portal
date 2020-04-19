import React, { useState, useEffect } from "react";
import style from "./login.module.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AxiosPost } from "../Common/Axios";
import { EncryptToken } from "../Common/Encrypt";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";


function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
    checked: false,
  });
const [loading,setLoading]=useState(false)
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
    setLoading(true)
    console.log("Login submit called");
    let body = { ...data, checked: undefined };

    async function handleSuccess(res) {
      //console.log(res);
      if (res.data.token) {
        let encryptedToken = await EncryptToken(res.data.token);
       // console.log(encryptedToken);
        document.cookie = `token=${encryptedToken};`;
        //history.push("/admin");
        window.location.pathname='/admin'
        setLoading(false)
      }
    }
    AxiosPost("/api/v1/token/authorize", body, handleSuccess);
  }
  return (
    <Loader active={loading}>
    <Container>
      <Row>
        <Col>
          <Card className={"mx-auto " + style.logincard}>
            {/* <Card.Img variant="top" src={Logo} /> */}
            <Card.Header bg="info" className="text-center">
              <span style={{ fontSize: "1.5rem" }}>Login</span>
              {/* <AccountCircleIcon style={{fontSize:'2rem'}}/> */}
            </Card.Header>
            <Card.Body>
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<SendIcon />}
                  >
                    Login
                  </Button>
                </Row>
                <Row className="mt-2">
                  <Col sm="8">
                    <Link to="/">Forgot Password?</Link>
                  </Col>
                  <Col sm="8">
                    <Link to="/">Register</Link>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Loader>
  );
}

export default Login;
