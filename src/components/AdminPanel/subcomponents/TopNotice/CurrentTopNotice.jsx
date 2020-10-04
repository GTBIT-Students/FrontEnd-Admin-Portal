import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../Common/Loader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";
import swalAlert from "../../../Common/SwalAlert";
import { AxiosGet, AxiosDelete } from "../../../Common/Axios";
import swal from "sweetalert";

function CurrentTopNotice({ setLastTen, handleInput, showinput, refresh }) {
  const [notice, SetNotice] = useState();
  const [showLoader, setLoader] = useState(true);
  function handleDelete() {
    console.log("inside del");
    setLoader(true);

    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swalAlert(
        "Successfully Deleted",
        undefined,
        "success",
        undefined,
        refresh,
        refresh
      );
    }
    AxiosDelete("/api/v1/upper-notice", {}, handleSuccess);
  }
  useEffect(() => {
    function handleSuccess(res) {
      console.log(res);
      console.log(res.data.current_notice[0].notice);
      let resNotice = res.data.current_notice[0].notice;
      if (res.status === 200) {
        if (resNotice === null || resNotice === "")
          //text inside setNotice is used down as cond for delete button
          SetNotice("* No Current Top Notice,Please Update one *");
        else SetNotice(resNotice);
        setLoader(false);
      }
      setLastTen(res.data.previous_notice);
    }
    function handleErr(err) {
      swal(
        "Unauthorised Access",
        "You are not authorised to access this page.",
        "error"
      );
    }
    AxiosGet("/api/v1/upper-notice", handleSuccess, handleErr);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-3">
      <Loader active={showLoader}>
        <Typography color="textSecondary" gutterBottom>
          Current Top Notice
        </Typography>
        <Row>
          <Col md={"12"}>{notice}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="col-auto">
            {" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={showinput === true ? <CancelIcon /> : <UpdateIcon />}
              onClick={handleInput}
            >
              {showinput === true ? "Cancel" : "Update"}
            </Button>
          </Col>
          {notice && notice !== "* No Current Top Notice,Please Update one *" && (
            <Col className="pl-0">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  swalAlert(
                    "Delete",
                    "Are u sure?",
                    undefined,
                    ["No", "Yes"],
                    handleDelete
                  )
                }
              >
                Delete
              </Button>
            </Col>
          )}
        </Row>
      </Loader>
    </div>
  );
}

export default CurrentTopNotice;
