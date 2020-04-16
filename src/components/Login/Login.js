import React, { useState, useEffect } from "react";
import style from './login.module.css'
import { Card, Row, Col, Container, Dropdown } from "react-bootstrap";
import Logo from "../../Image/GTBITlogo.png";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link } from "react-router-dom";
function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
    checked: false
  });
  const [type, setType] = useState();
  const [open, setOpen] = React.useState(false);
  const handleType = event => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(e) {
    let name = e.target.name;
    let value;
    if (name === "checked") value = e.target.checked;
    else value = e.target.value;

    setData({ ...data, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login submit called");
  }
  return (
    <Container>
      <Row>
        <Col>
          <Card className={"mx-auto "+style.logincard}>
            {/* <Card.Img variant="top" src={Logo} /> */}
            <Card.Header bg="info" className="text-center">
              Login <AccountCircleIcon/>
            </Card.Header>
            <Card.Body>
              <form  autoComplete="off" onSubmit={handleSubmit}>
                <FormControl className="mb-3" fullWidth>
                  <InputLabel id="demo-controlled-open-select-label">
                    Signing as
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={type}
                    onChange={handleType}
                    required
                  >
                    <MenuItem value={""} disabled={true}> Signing as</MenuItem>
                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                  </Select>
                </FormControl>

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
  );
}

export default Login;
