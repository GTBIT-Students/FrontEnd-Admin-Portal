// three props:type(string),routeData(object),msg(object)
// type=error,warning,info,success
// routeData{route,name}
//msg{title,desc}

import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
function AfterRequestAlerts({ type, routeData, msg }) {
  const action = routeData && (
    <Link
      to={`${routeData.route}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Button color="inherit" size="small">
        {routeData.name}
      </Button>
    </Link>
  );

  return (
    <>
      <Alert severity={type} action={action}>
        <AlertTitle>{msg.title}</AlertTitle>
        {msg.desc} — <strong>check it out!</strong>
      </Alert>
    </>
  );
}

export default AfterRequestAlerts;
