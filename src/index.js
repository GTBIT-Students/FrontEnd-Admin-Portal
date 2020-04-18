import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,Route } from "react-router-dom";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Login from "./components/Login/Login";

ReactDOM.render(
  <BrowserRouter>
   
    <Route exact path="/" component={Routes}/>
    <Route  path="/admin" component={AdminPanel}/>
    <Route  path="/login" component={Login}/>

  </BrowserRouter>,
  document.getElementById("root")
);
