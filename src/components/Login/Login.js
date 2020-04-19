import React, { useState, useEffect } from "react";
import style from "./login.module.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
//import PNotify from "../Common/PNotify";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AxiosPost } from "../Common/Axios";
import { EncryptToken, DecryptToken } from "../Common/Encrypt";
//import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import swal from "sweetalert";
import Skeleton from '@material-ui/lab/Skeleton';

function Login() {
  document.body.style.background = "rgb(244,245,246)";
  const [data, setData] = useState({
    username: "",
    password: "",
    checked: false,
  });
  const [loading, setLoading] = useState(false);
const [showLogin,setShowLogin]=useState(false)

  useEffect(() => {
    console.log("fetching...name and pass ");
    async function fetchData() {
      if (typeof Storage !== "undefined") {
        if(localStorage.getItem("uname") && localStorage.getItem("pass")){
          let uname =await  DecryptToken(localStorage.getItem("uname"));
          let pass =await DecryptToken(localStorage.getItem("pass"));
          let token =await document.cookie.match("(^|[^;]+)\\s*" + "token" + "\\s*=\\s*([^;]+)");
          if(token) token=token.pop();
          console.log(uname, pass,token);
          let body={username:uname,password:pass}
          console.log(body);
          setData({username:uname})
          if(uname && pass && token)
          AxiosPost("/api/v1/token/authorize", body, handleSuccess, ()=>{console.log('handleerror');setShowLogin(true);});
          else setShowLogin(true)
        }
        else{
          console.log('uname pass not found');
          setShowLogin(true)
        }
      } else {
        setShowLogin(true)
        console.log("Sorry! No Web Storage support..");
      }
    }
    fetchData();
  }, []);
  function handleChange(e) {
    let name = e.target.name;
    let value;
    if (name === "checked") value = e.target.checked;
    else value = e.target.value;

    setData({ ...data, [name]: value });
  }
  async function saveToLocalStorage() {
    console.log("checked");
    localStorage.setItem("uname", await EncryptToken(data.username));
    localStorage.setItem("pass", await EncryptToken(data.password));
  }


  async function handleSuccess(res) {
    if (res.data.token) {
      let encryptedToken = await EncryptToken(res.data.token);
      document.cookie = `token=${encryptedToken};`;
      // history.push("/admin");
      if (data.checked) saveToLocalStorage();
    else console.log("not checked");
      window.location.pathname = "/admin";
      setLoading(false);
    }
  }
  async function handleErr(err) {
    swal("Authentication Failed", "", "error");
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    console.log("Login submit called");
    let body = { ...data, checked: undefined };
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
    {showLogin?
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
     :<>
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton variant="rect"  height={218} />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      </>
    }
          </Card>

        </Col>
      </Row>
     
    </Container>
  );
}

export default Login;
