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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-bootstrap/Modal";
import CancelIcon from '@material-ui/icons/Cancel';

const list = [
  {
    name: "name",
    Display: "Society Name",
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

//modules and formats for react quill
let modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

let formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
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
    is_active: true,
    category: "",
  });
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = useState();
  const [showDnD, setDnd] = useState(false);
  const [modal, openModal] = useState(true);
  const [carousel_files, setCaroFiles] = useState([]);

  let Soc_Data = history.location.Soc_Data;
  useEffect(() => {
    if (Soc_Data) {
      setData({
        name: Soc_Data.name,
        description: Soc_Data.description,
        tag_line: Soc_Data.tag_line,
        teacher_incharge: Soc_Data.teacher_incharge,
        student_incharge: Soc_Data.student_incharge,
        founded_on: new Date(Soc_Data.founded_on),
        is_active: Soc_Data.is_active,
        category: Soc_Data.category,
      });
      setShowForm(true);
    }
  }, []);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleFileCheck(NewFiles, setSuccess) {
    if (NewFiles)
      if (NewFiles.length === 1) {
        let file = NewFiles[0];
        console.log(file);

        if (file.type.slice(0, 5) !== "image") {
          swal("File should be image", "Try again", "warning");
          return;
        }
        setFiles(file);
        setSuccess(true);
      } else if (NewFiles.length > 1) {
        swal("Please Select One File", "Try again", "warning");
      }
    console.log([...NewFiles]);
    console.log(NewFiles.length);
  }
  function handleSubmit(e) {
    if (e) e.preventDefault();
    let formdata = new FormData();
    for (let key in data) {
      console.log(key, data[key]);
      formdata.append(`${key}`, data[key]);
    }
    console.log(data.founded_on.toISOString().split("T")[0]);
    formdata.append("founded_on", data.founded_on.toISOString().split("T")[0]);
    formdata.append("is_active", JSON.stringify(data.is_active));
    if (files) formdata.append("logo", files);
    // else formdata.append("image_url", "");

    console.log(data);
    for (var pair of formdata.entries()) {
      console.log(pair[0], pair[1]);
    }
    setLoader(true);
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Successfully Added", undefined, "success");
      history.push("/admin/Society");
      //history.push("");
    }
    function handleError(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong! Try Again", undefined, "error");
    }
    AxiosPost("/api/v1/society-list", formdata, handleSuccess, handleError);
  }
  function handleCarouselFiles(NewFiles, setSuccess) {
    console.log(NewFiles);
    if (NewFiles)
      if (NewFiles.length >= 1) {
        Array.from(NewFiles).forEach((file) => {
          if (file.type.slice(0, 5) !== "image") {
            swal("File should be image", "Try again", "warning");
            return;
          }
          let temp = carousel_files;
          temp.push(file);
          console.log(file);
        });
        setCaroFiles(NewFiles);

        setSuccess(true);
      }
    console.log(NewFiles.length);
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

              <Row className="justify-content-around my-3">
                <Col className="col-auto">
                  <label className="text-secondary mr-1"> Founded on:</label>
                  <DatePicker
                    onChange={(val) => setData({ ...data, founded_on: val })}
                    value={data.founded_on}
                    clearIcon={null}
                  />
                </Col>
                <Col className="col-auto">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.is_active}
                        onChange={(e) =>
                          setData({ ...data, is_active: e.target.checked })
                        }
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </Col>
              </Row>

              <Row className="justify-content-around">
                <Col className="col-auto">
                  <div>
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
                        <MenuItem value={"miscellaneous"}>
                          Miscellaneous
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Col>
                <Col className="d-flex align-items-end col-auto">
                  <button
                    type="button"
                    className={
                      showDnD
                        ? "btn-outline-danger btn d-block"
                        : "btn-outline-success btn d-block"
                    }
                    onClick={() => setDnd(!showDnD)}
                  >
                    {showDnD ? "Cancel" : "Add Logo"}
                  </button>
                </Col>
              </Row>
              {files && files.name && (
                <Row className="mt-4 ">
                  <Col sm="12">
                    <img
                      src={URL.createObjectURL(files)}
                      className="d-block img-fluid mx-auto"
                      alt="pic"
                      style={{ maxHeight: "200px" }}
                    />
                  </Col>
                  <Col>
                    <button
                      className="btn btn-outline-dark d-block mx-auto my-2"
                      type="button"
                      onClick={() =>
                        swal(
                          "Changing Logo",
                          "Are you sure ?",
                          undefined,
                          ["No", "Yes"],
                          () => setFiles()
                        )
                      }
                    >
                      Change Logo
                    </button>
                  </Col>
                </Row>
              )}

              {showDnD && (
                <div className="my-4 mx-auto" style={{ width: "80%" }}>
                  <DragAndDrop
                    handleFileCheck={handleFileCheck}
                    files={files}
                    inputProps={{
                      accept: "image/*,.png,.jpg,.jpeg",
                    }}
                  />
                </div>
              )}
              {Soc_Data && (
                <div>
                  <button
                    type="button"
                    onClick={() => openModal(true)}
                    className="btn btn-dark"
                  >
                    Update Carousel Images{" "}
                  </button>
                </div>
              )}

              <div className="my-4">
                <div>
                  <label className="text-secondary">Society Description:</label>
                </div>

                <ReactQuill
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={data.description}
                  onChange={(val) => setData({ ...data, description: val })}
                />
              </div>

              <Row className="justify-content-end mt-2">
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {Soc_Data ? "Update Society" : "Add Society"}
                </Button>
              </Row>
            </form>
          </div>
        </Loader>
      )}

      {!Soc_Data && (
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
      )}

      <Modal size="lg" className="Carouselmodal" show={modal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Carousel Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>Current Carousel Photos</span>
            <div className="d-flex flex-row">
              {Soc_Data &&
                Soc_Data.image_carousel.map((image) => (
                  <div key={image} style={{ width: "200px" }}>
                    <img src={image} className="img-fluid" />
                  </div>
                ))}
            </div>
          </div>
          <div >
          <div className="d-flex flex-row overflow-auto">
            {carousel_files &&
              Array.from(carousel_files).map((file) => (
                <div key={file} className="position-relative">
                <img  src={URL.createObjectURL(file)} style={{ width: "200px",height:"150px" }} />
                <div className="imgCross"><CancelIcon/></div>
                </div>
              )
              )}
              </div>
            <DragAndDrop
              inputProps={{ multiple: true, accept: "image/*,.png,.jpg,.jpeg" }}
              handleFileCheck={handleCarouselFiles}
              files={carousel_files}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => openModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => openModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSociety;
