import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,Route } from "react-router-dom";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPanel from "./components/AdminPanel/AdminPanel";

ReactDOM.render(
  <BrowserRouter>
   
    <Route exact path="/" component={Routes}/>
    <Route  path="/admin" component={AdminPanel}/>

  </BrowserRouter>,
  document.getElementById("root")
);
