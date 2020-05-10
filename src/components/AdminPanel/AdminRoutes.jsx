import React from "react";
import { useParams } from "react-router-dom";
import UpdateTopNotice from "./subcomponents/TopNotice/UpdateTopNotice";
import Events from "./subcomponents/Events/Events";
import UpdateEvent from "./subcomponents/Events/UpdateEvent";
import ImportantLinks from "./subcomponents/ImportantLinks/ImportantLinks";
import Notices from "./subcomponents/Notices/Notices";
import Society from "./subcomponents/Society/Society";
import UpdateSociety from "./subcomponents/Society/UpdateSociety";

function AdminRoutes() {
  const { params } = useParams();
  console.log(params);
  switch (params) {
    case "UpdateTopNotice":
      return <UpdateTopNotice />;

    case "Events":
      return <Events />;

    case "UpdateEvent":
      return <UpdateEvent />;

    case "ImportantLinks":
      return <ImportantLinks />;

    case "Notices":
      return <Notices />;

    case "Society":
      return <Society/>;

    case "UpdateSociety":
      return <UpdateSociety/>;

    default:
      return <h1>404 Not Found</h1>;
  }
}

export default AdminRoutes;
