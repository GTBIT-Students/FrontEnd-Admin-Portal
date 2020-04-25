import React from "react";
import CurrentImpLinks from "./CurrentImpLinks";
import CreateImpLink from "./CreateImpLink";
import HeadingCard from "../../../Common/HeadingCard";

function ImportantLinks() {
  return (
    <div>
     <HeadingCard heading={"Update Important Links"} bgcolor={"linear-gradient(to right,#fe9365,#feb798)"}/>
      <CreateImpLink />
      <CurrentImpLinks />
    </div>
  );
}

export default ImportantLinks;
