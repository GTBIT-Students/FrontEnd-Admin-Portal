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
import LastTenNotices from "./LastTenNotices";
import Divider from "@material-ui/core/Divider";
import "../../../Common/commonStyle.css";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const bgStyle={
  background:"linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
}

function CurrentNotices() {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [MoreData, setMoreData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [moreBtn, setMoreBtn] = useState(true);
  const [lastTenNotices, setLastTen] = useState([]);

  useEffect(() => {
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      if (res.data.current_notice.length >= 5) {
        let temp = res.data.current_notice.slice(0, 5);
        console.log(temp);
        setData(temp);
        setMoreData(res.data.current_notice.slice(5));
      } else setData(res.data.current_notice);

      setLastTen(res.data.previous_notice);
    }

    AxiosGet("/api/v1/notice-list", handleSuccess, (err) => console.log(err));
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
      notice_id: id,
    };
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Deleted Successfully", undefined, "success");
      history.push("/");
      history.push("/admin/Notices");
    }

    function handleErr(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong", undefined, "error");
    }
    AxiosDelete("/api/v1/notice-list", body, handleSuccess, handleErr);
  }
  return (
    <div className="mt-4">
      <Loader active={loader} >
        <Typography color="textSecondary" gutterBottom>
          Current Notices
        </Typography>
        <div>
          {data.map((item) => (
            <div key={item.id} className="CurrentDataContainer">
              <RadioButtonUncheckedIcon
                className="mx-3"
                style={{ color: "blueviolet",fontSize:'.9rem' }}
              />

              <div>{item.notice}</div>

              <div className="DragBarContainer" style={bgStyle}>
                <div class="Arrowcircle">
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
                      pathname: "UpdateNotice",
                      NoticeData: item,
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
              {moreBtn ? "Show More Notices" : "Show Less Notices"}
            </Button>
          )}
        </div>
      </Loader>

      <LastTenNotices data={lastTenNotices} />
    </div>
  );
}

export default CurrentNotices;

// {/* <ListItem key={item.id} className="pl-0">
//               <ListItemIcon style={{ color: "blueviolet", minWidth: "35px" }}>
//                 <RadioButtonUncheckedIcon fontSize={"small"} />
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.notice}
//                 secondary={item.description}
//               />
//               <ListItemSecondaryAction>
//                 <IconButton
//                   edge="end"
//                   aria-label="delete"
//                   onClick={() => {
//                     swal("Delete","Are you sure ?",undefined,["No","Yes"],()=>handleDelete(item.id))
//                   }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem> */}
