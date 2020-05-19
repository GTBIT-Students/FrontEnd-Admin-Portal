import React, { useEffect, useState } from "react";
import { AxiosGet, AxiosDelete } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";
import LastTenEvents from "./LastTenEvents";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const bgStyle={
  background:"linear-gradient(to right,#fe5d70,#fe909d)",
}

function CurrentEvents() {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [MoreData, setMoreData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [moreBtn, setMoreBtn] = useState(true);
  const [lastTenEvents, setLastTen] = useState([]);

  useEffect(() => {
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      if (res.data.current_event.length >= 5) {
        let temp = res.data.current_event.slice(0, 5);
        console.log(temp);
        setData(temp);
        setMoreData(res.data.current_event.slice(5));
      } else setData(res.data.current_event);

      setLastTen(res.data.previous_event);
    }

    AxiosGet("/api/v1/event-list", handleSuccess, (err) => console.log(err));
  }, []);
  useEffect(() => {
    if (moreBtn === false) {
      let temp = [...data, ...MoreData];
      setData(temp);
    } else {
      let temp = data.slice(0, 5);
      setData(temp);
    }
  }, [moreBtn]);
  function handleDelete(id) {
    setLoader(true);
    let body = {
      event_id: id,
    };
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Deleted Successfully", undefined, "success");
      history.push("/");
      history.push("/admin/Events");
    }

    function handleErr(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong", undefined, "error");
    }
    AxiosDelete("/api/v1/event-list", body, handleSuccess, handleErr);
  }
  return (
    <div className="mt-4">
      <Loader active={loader}>
        <Typography color="textSecondary" gutterBottom>
          Current Events
        </Typography>
        <div>
          {data.map((item) => (
            <div key={item.id} className="CurrentDataContainer">
              <RadioButtonUncheckedIcon
                className="mx-3"
                style={{ color: "blueviolet",fontSize:'.9rem' }}
              />

              <div>{item.event_name}</div>

              <div className="DragBarContainer" style={bgStyle}>
                <div className="Arrowcircle">
                  <ArrowBackIosIcon className="circle_arr" />
                </div>
                <button
                  onClick={() => {
                    swal(
                      "Delete",
                      "Are you sure ?",
                      undefined,
                      ["No", "Yes"],
                      () => handleDelete(item.id)
                    );
                  }}
                  className="btn btn-outline-danger p-1 mr-1"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    history.push({
                      pathname: "UpdateEvent",
                      EventData: item,
                    })
                  }
                  className="btn btn-outline-info p-1"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {MoreData.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              className="m-auto d-block text-info"
              onClick={() => setMoreBtn(!moreBtn)}
            >
              {moreBtn ? "Show More Events" : "Show Less Events"}
            </Button>
          )}
        </div>
      </Loader>

      <LastTenEvents data={lastTenEvents} />
    </div>
  );
}

export default CurrentEvents;


// <div key={item.id}>
// <div className="row border my-2 rounded">
//   <div className="col-1  d-flex">
//     <RadioButtonUncheckedIcon
//       fontSize={"small"}
//       style={{ color: "blueviolet" }}
//       className="mx-auto my-auto"
//     />
//   </div>
//   <div className="col-10 col-sm-8 ">
//     <div>{item.event_name}</div>
//   </div>
//   <div className="col-12 col-sm-3 d-flex justify-content-center align-items-center my-2">
    
//       <button
//         onClick={() => {
//           swal(
//             "Delete",
//             "Are you sure ?",
//             undefined,
//             ["No", "Yes"],
//             () => handleDelete(item.id)
//           );
//         }}
//         className="btn btn-outline-danger p-1 mr-1"
//       >
//         Delete
//       </button>
//       <button
//         onClick={() =>
//           history.push({
//             pathname: "UpdateEvent",
//             EventData: item,
//           })
//         }
//         className="btn btn-outline-info p-1"
//       >
//         Update
//       </button>
  
//   </div>
// </div>

// </div>