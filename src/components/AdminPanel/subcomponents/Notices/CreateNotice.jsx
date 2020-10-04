import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import { AxiosPost, AxiosPut } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";
import Quill from "../../../Common/ReactQuill";

const list = [
  {
    name: "notice",
    Display: "Notice",
  },
];
function CreateNotice() {
  let history = useHistory();
  let Notice_Data = history.location.NoticeData;
  console.log(Notice_Data);
  const [data, setData] = useState({
    notice: "",
    description: "",
  });
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (Notice_Data) {
      setData({
        notice: Notice_Data.notice,
        description: Notice_Data.description,
      });
      setShowForm(true);
    }
    // eslint-disable-next-line
  }, []);
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    setLoader(true);
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Successfully Added", undefined, "success");
      history.push("/admin");
      history.push("/admin/Notices");
    }
    function handleError(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong! Try Again", undefined, "error");
    }
    if (Notice_Data)
      AxiosPut(
        "/api/v1/notice-list",
        { ...data, notice_id: Notice_Data.id },
        handleSuccess,
        handleError
      );
    else AxiosPost("/api/v1/notice-list", data, handleSuccess, handleError);
  }
  return (
    <div className="mt-3">
      {showForm && (
        <Loader active={loader}>
          <div>
            <form onSubmit={handleSubmit}>
              {list.map((item, index) => (
                <TextField
                  required
                  id="standard-full-width"
                  label={item.Display}
                  variant={"outlined"}
                  className="mt-3 mx-0"
                  placeholder={`Enter ${item.Display}`}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size={"medium"}
                  name={item.name}
                  key={index}
                  onChange={handleChange}
                  value={data[item.name]}
                />
              ))}
              <div className="mt-1 mb-3">
                <div>
                  <label className="text-secondary">Notice Description:</label>
                </div>
                <Quill
                  value={data.description}
                  handleChange={(val) => setData({ ...data, description: val })}
                />
              </div>
              <Row className="justify-content-end mt-2">
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {Notice_Data ? "Update Notice" : "Add Notice"}
                </Button>
              </Row>
            </form>
          </div>
        </Loader>
      )}

      {!Notice_Data && (
        <Row className=" mt-3">
          <Col className="col-auto">
            <Button
              className="d-block mr-2"
              variant="contained"
              color={!showForm ? "primary" : "secondary"}
              type="submit"
              //endIcon={!showForm?<AddBoxIcon/>:<ClearIcon/>}
              onClick={() => setShowForm(!showForm)}
            >
              {!showForm ? "Create Notice" : "Cancel"}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CreateNotice;
