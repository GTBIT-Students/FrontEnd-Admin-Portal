import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import { AxiosPost } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ClearIcon from "@material-ui/icons/Clear";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DragAndDrop from "../../../Common/DragAndDrop";

const list = [
  {
    name: "name",
    Display: "Society Name",
  },
  {
    name: "description",
    Display: "Society Description",
  },
  {
    name: "tag_line",
    Display: "Tag Line",
  },
  {
    name: "teacher_incharge",
    Display: "Teacher Incharge",
  },
  {
    name: "student_incharge",
    Display: "Student Incharge",
  },
];
function CreateSociety() {
  let history = useHistory();
  const [data, setData] = useState({
    name: "",
    description: "",
    tag_line: "",
    teacher_incharge: "",
    student_incharge: "",
    founded_on: "",
    is_active: "",
    category: "",
  });
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [files, setFiles] = useState();
  const [showDnD, setDnd] = useState(false);
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleFileCheck(NewFiles, setSucces) {
    console.log(NewFiles);
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
    AxiosPost("/api/v1/notice-list", data, handleSuccess, handleError);
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

              <Row>
                <Col>
                  <label className="text-secondary mr-1"> Founded on:</label>
                  <DatePicker
                    onChange={(val) => setData({ ...data,founded_on: val })}
                    value={data.founded_on}
                    clearIcon={null}
                  />
                </Col>
                <Col>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.is_active}
                        onChange={(e)=>setData({...data,is_active:e.target.checked})}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl style={{ width: "10rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      Society Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={data.category}
                      name="category"
                      onChange={handleChange}
                    >
                      <MenuItem value={"technical"}>Technical</MenuItem>
                      <MenuItem value={"cultural"}>Cultural</MenuItem>
                      <MenuItem value={"religious"}>Religious</MenuItem>
                      <MenuItem value={"miscellaneous"}>Miscellaneous</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col className="d-flex align-items-end">
                  <button
                    type="button"
                    
                    className={showDnD ?'btn-outline-danger btn d-block':'btn-outline-success btn d-block'}
                    onClick={()=>setDnd(!showDnD)}
                  >
                    {showDnD?'Cancel':'Add Logo'}
                  </button>
                </Col>
              </Row>
              {showDnD && (
                <div className="my-4">
                  <DragAndDrop
                    handleFileCheck={handleFileCheck}
                    files={files}
                  />
                </div>
              )}
              <Row className="justify-content-end mt-2">
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Society
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
            {!showForm ? "Add Society" : "Cancel"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CreateSociety;
