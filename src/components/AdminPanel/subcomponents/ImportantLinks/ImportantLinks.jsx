import React from "react";
import CurrentImpLinks from "./CurrentImpLinks";
import CreateImpLink from "./CreateImpLink";
import HeadingCard from "../../../Common/HeadingCard";

function ImportantLinks() {
  return (
    <div>
     <HeadingCard heading={"Update Important Links"} />
      <CreateImpLink />
      <CurrentImpLinks />
    </div>
  );
}

export default ImportantLinks;
