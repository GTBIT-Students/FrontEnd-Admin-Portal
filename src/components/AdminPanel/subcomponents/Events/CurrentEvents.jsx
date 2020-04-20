import React, { useEffect, useState } from "react";
import { AxiosGet } from "../../../Common/Axios";

function CurrentEvents() {
  useEffect(() => {
    function handleSuccess(res) {
      console.log(res);
    }
    AxiosGet("/api/v1/event-list", handleSuccess, (err) => console.log(err));
  }, []);
  return <div></div>;
}

export default CurrentEvents;
