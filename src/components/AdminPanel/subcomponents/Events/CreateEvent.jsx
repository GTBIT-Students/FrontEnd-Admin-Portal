import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import { AxiosPost, AxiosPut } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ClearIcon from "@material-ui/icons/Clear";
import Icon from "@material-ui/core/Icon";
import DragAndDrop from "../../../Common/DragAndDrop";
import CancelIcon from "@material-ui/icons/Cancel";
import Quill from '../../../Common/ReactQuill'
const list = [
  {
    name: "event_name",
    Display: "Event Name",
  },
  {
    name: "event_venue",
    Display: "Event Venue",
  },
];
function CreateEvent() {
  let history = useHistory();
  //EventData is defined whenever we press update button on current events list
  let EventData = history.location.EventData;
  const [data, setData] = useState({
    event_name: EventData ? EventData.event_name : "",
    description: EventData ? EventData.description : "",
    event_date: EventData ? new Date(EventData.event_date) : new Date(),
    event_time: EventData ? EventData.event_time : "10:00",
    event_venue: EventData ? EventData.event_venue : "",
  });
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(EventData ? true : false);
  const [files, setFiles] = useState(EventData ? EventData.event_image : "");

  useEffect(() => {
    if (EventData) {
      console.log("eventdata exist", EventData);
    }
  }, []);
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    let formdata = new FormData();
    for (let key in data) {
      console.log(key, data[key]);
      formdata.append(`${key}`, data[key]);
    }
    formdata.append("event_date", data.event_date.toISOString().split("T")[0]);
    if (files) formdata.append("image", files);
    else formdata.append("image_url", "");
    //sending additonal id in case of updating event
    if (EventData) formdata.append("event_id", EventData.id);

    console.log(formdata);
    setLoader(true);
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal(
        EventData ? "Successfully Updated" : "Successfully Added",
        undefined,
        "success"
      );
      history.push("/admin");
      history.push("/admin/Events");
    }
    function handleError(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong! Try Again", undefined, "error");
    }

    if (EventData) {
      console.log("Caling put function for update event");
      AxiosPut("/api/v1/event-list", formdata, handleSuccess, handleError);
    } else
      AxiosPost("/api/v1/event-list", formdata, handleSuccess, handleError);
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
    //if(NewFiles && NewFiles.length>0){
    //setFiles([...NewFiles])
    //}
  }
  return (
    <div className="mt-3">
      {showForm && (
        <Loader active={loader}>
          <div>
            <form>
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
                  <label className="text-secondary">Event Description:</label>
                </div>
                <Quill
                  value={data.description}
                  handleChange={(val) => setData({ ...data, description: val })}
                />
              </div>

              <Row className="mx-1">
                <Col>
                  <label className="text-secondary mr-1"> Event Date:</label>
                  <DatePicker
                    onChange={(val) => setData({ ...data, event_date: val })}
                    value={data.event_date}
                    clearIcon={null}
                  />
                </Col>
                <Col>
                  <label className="text-secondary mr-1"> Event Time:</label>
                  <TimePicker
                    locale="en-US"
                    clearIcon={null}
                    onChange={(val) => setData({ ...data, event_time: val })}
                    value={data.event_time}
                    required
                    placeholder="time"
                  />
                </Col>
              </Row>
              {/* for image with url */}
              {EventData && files && !files.name && (
                <Row className="mt-2">
                  <Col sm="12">
                    <img
                      src={files}
                      alt="Event pic"
                      className="d-block img-fluid mx-auto"
                      style={{ maxHeight: "250px" }}
                    />
                  </Col>
                  <button
                    type="button"
                    className="btn btn-outline-dark d-block mx-auto my-2"
                    onClick={() => {
                      swal(
                        "Removing Photo",
                        "Are you sure ?",
                        undefined,
                        ["No", "Yes"],
                        () => setFiles()
                      );
                    }}
                  >
                    Remove Photo
                  </button>
                </Row>
              )}

              {files && files.name && (
                <Row className="mt-2">
                  <Col sm="12">
                    <img
                      src={URL.createObjectURL(files)}
                      className="d-block img-fluid mx-auto"
                      alt="pic"
                      style={{ maxHeight: "400px" }}
                    />
                  </Col>
                  <Col>
                    <button
                      className="btn btn-outline-dark d-block mx-auto my-2"
                      type="button"
                      onClick={() =>
                        swal(
                          "Changing Photo",
                          "Are you sure ?",
                          undefined,
                          ["No", "Yes"],
                          () => setFiles()
                        )
                      }
                    >
                      Change Photo
                    </button>
                  </Col>
                </Row>
              )}

              {!files && (
                <Row className="justify-content-center my-3">
                  <Col sm="10">
                    <DragAndDrop
                      handleFileCheck={handleFileCheck}
                      files={files}
                      inputProps={{
                        accept: "image/*,.png,.jpg,.jpeg",
                      }}
                    />
                  </Col>
                  {files && (
                    <Col sm="10" className="text-center text-dark">
                      <span>{files.name}</span>
                      <span onClick={() => setFiles()}>
                        <CancelIcon />
                      </span>
                    </Col>
                  )}
                </Row>
              )}
              <Row className="justify-content-end mt-2">
                {EventData && (
                  <Button
                    className="d-block mr-2"
                    variant="contained"
                    color="secondary"
                    //type="submit"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  //type="submit"
                  onClick={() => {
                    if (EventData) {
                      swal(
                        "Update",
                        "Are you sure ?",
                        undefined,
                        ["No", "Yes"],
                        handleSubmit
                      );
                      console.log("passed");
                      return;
                    } else handleSubmit();
                  }}
                >
                  {EventData ? "Update Event" : "Add Event"}
                </Button>
              </Row>
            </form>
          </div>
        </Loader>
      )}
      {!EventData && (
        <Row className=" mt-3">
          <Col className="col-auto">
            <Button
              className="d-block mr-2"
              variant="contained"
              color={!showForm ? "primary" : "secondary"}
              //endIcon={!showForm?<AddBoxIcon/>:<ClearIcon/>}
              onClick={() => setShowForm(!showForm)}
            >
              {!showForm ? "Create Event" : "Cancel"}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CreateEvent;
