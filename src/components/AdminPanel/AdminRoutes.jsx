import React from "react";
import { useParams } from "react-router-dom";
import UpdateTopNotice from "./subcomponents/TopNotice/UpdateTopNotice";
import Events from "./subcomponents/Events/Events";
import ImportantLinks from "./subcomponents/ImportantLinks/ImportantLinks";

function AdminRoutes() {
  const { params } = useParams();
  console.log(params);
  switch (params) {
    case "UpdateTopNotice":
      return <UpdateTopNotice />;
      
    case "Events":
      return <Events />;
     
    case "ImportantLinks":
      return <ImportantLinks/>;
     
    default:
      return <h1>404 Not Found</h1>;
      
  }
}

export default AdminRoutes;
