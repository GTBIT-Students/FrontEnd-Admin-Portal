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
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
import Icon from '@material-ui/core/Icon';

const list = [
  {
    name: "event_name",
    Display: "Event Name",
  },
  {
    name: "event_link",
    Display: "Event Link",
  },
  {
    name: "event_venue",
    Display: "Event Venue",
  },
];
function CreateEvent() {
  let history = useHistory();
  const [data, setData] = useState({
    event_name: "",
    event_link: "",
    event_date: new Date(),
    event_time: "10:00",
    event_venue: "",
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
      history.push("/admin/Events");
    }
    function handleError(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong! Try Again", undefined, "error");
    }
    AxiosPost("/api/v1/event-list", data, handleSuccess, handleError);
  }
  return (
    <div>
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
              <Row className="justify-content-end mt-2">
                <Button
                  className="d-block mr-2"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Event
                </Button>
              </Row>
            </form>
          </div>
        </Loader>
      ) }
       
          <Row className=" mt-3">
          <Col className="col-auto">

            <Button
              className="d-block mr-2"
              variant="contained"
              color="primary"
              type="submit"
              startIcon={!showForm?<AddBoxIcon/>:<ClearIcon/>}
              onClick={()=>setShowForm(!showForm)}
            >
              {!showForm?'Create Event':'Cancel'}
            </Button>
          </Col>
          </Row>
    </div>
  );
}

export default CreateEvent;
