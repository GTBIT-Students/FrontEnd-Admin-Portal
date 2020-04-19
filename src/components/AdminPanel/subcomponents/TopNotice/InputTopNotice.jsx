import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Loader from "../../../Common/Loader";
import domainurl from "../../../Common/Domain";
import swalAlert from "../../../Common/SwalAlert";
import Divider from "@material-ui/core/Divider";
import { AxiosPost } from "../../../Common/Axios";
import swal from "sweetalert";

function InputTopNotice({ style, refresh }) {
  const [val, setVal] = useState();
  const [active, setActive] = useState(false);
  const update = (e) => {
    e.preventDefault();
    if (!val) {
      swalAlert("Notice Cannot be Empty !!", undefined, "info");
      return;
    }
    setActive(true);

    function handleSuccess(res) {
      console.log(res);
      setActive(false);
      setVal("");
      swalAlert(
        "Sucessfully Updated",
        undefined,
        "success",
        undefined,
        refresh
      );
    }
    function handleErr(err) {
      swal(
        "Unauthorised Access",
        "You are not authorised to access this page",
        "error"
      );
    }
    AxiosPost(
      "/api/v1/upper-notice",
      { notice: val },
      handleSuccess,
      handleErr
    );
  };

  return (
    <>
      <div className="my-5" style={style}>
        <Loader active={active}>
          <TextField
            fullWidth={true}
            autoFocus
            helperText="Notice to be shown on top of Home page"
            label="Top Notice"
            multiline
            required
            rows={2}
            rowsMax={2}
            size={"medium"}
            variant={"outlined"}
            placeholder="Enter notice here"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div className="d-flex justify-content-end">
            <Button color="primary" variant={"contained"} onClick={update}>
              Update
            </Button>
          </div>
        </Loader>
      </div>
      <Divider />
    </>
  );
}

export default InputTopNotice;
