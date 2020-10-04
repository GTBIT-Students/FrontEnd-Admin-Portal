import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import { AxiosPost } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";

const list = [
  {
    name: "link_text",
    Display: "Link Title",
  },
  {
    name: "link",
    Display: "Link",
  },
];
function CreateImpLink() {
  let history = useHistory();
  const [data, setData] = useState({
    link_text: "",
    link: "",
  });
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      history.push("/admin/ImportantLinks");
    }
    function handleError(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong! Try Again", undefined, "error");
    }
    AxiosPost("/api/v1/important-link-list", data, handleSuccess, handleError);
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
                  style={{ margin: 8 }}
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

              <Row className="justify-content-end mt-2">
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Link
                </Button>
              </Row>
            </form>
          </div>
        </Loader>
      )}

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
            {!showForm ? "Create Link" : "Cancel"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CreateImpLink;
