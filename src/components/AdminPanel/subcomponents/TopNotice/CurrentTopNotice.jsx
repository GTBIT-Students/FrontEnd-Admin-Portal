import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../Common/Loader";
import domainurl from "../../../Common/Domain";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";
import swalAlert from "../../../Common/SwalAlert";
import {AxiosGet} from '../../../Common/Axios'

function CurrentTopNotice({ setLastTen, handleInput, showinput, refresh }) {
  const [notice, SetNotice] = useState();
  const [showLoader, setLoader] = useState(true);
  function handleDelete() {
    console.log("inside del");
    setLoader(true);
    const options={
      headers:{
        Authorization: "Token 5292645558db342649f9c41b50edd7db560962d2",
      }
    }
    axios
      .delete(`${domainurl}/api/v1/upper-notice`,options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
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
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    const options={
      headers:{
        Authorization: "Token 5292645558db342649f9c41b50edd7db560962d2",
      }
    }
    axios
      .get(`${domainurl}/api/v1/upper-notice`,options)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
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
                    "Are u sure?",
                    undefined,
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
