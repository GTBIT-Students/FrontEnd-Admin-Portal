import React from "react";
import CurrentImpLinks from "./CurrentImpLinks";
import CreateImpLink from "./CreateImpLink";

function ImportantLinks() {
  return (
    <div>
      <CreateImpLink />
      <CurrentImpLinks />
    </div>
  );
}

export default ImportantLinks;
