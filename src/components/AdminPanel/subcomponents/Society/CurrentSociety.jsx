import React, { useEffect, useState } from "react";
import { AxiosGet, AxiosDelete } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import swal from "../../../Common/SwalAlert";
import { useHistory } from "react-router-dom";
import "./societyStyle.css";

function CurrentSociety() {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [MoreData, setMoreData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [moreBtn, setMoreBtn] = useState(true);

  useEffect(() => {
    function handleSuccess(res) {
      console.log(res.data);
      setLoader(false);
      if (res.data.society_list.length >= 5) {
        let temp = res.data.society_list.slice(0, 5);
        console.log(temp);
        setData(temp);
        setMoreData(res.data.society_list.slice(5));
      } else setData(res.data.society_list);
    }

    AxiosGet("/api/v1/society-list", handleSuccess, (err) => console.log(err));
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
      society_id: id,
    };
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Deleted Successfully", undefined, "success");
      history.push("/admin");
      history.push("/admin/Society");
    }

    function handleErr(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong", undefined, "error");
    }
    AxiosDelete("/api/v1/society-list", body, handleSuccess, handleErr);
  }
  return (
    <div className="mt-4">
      <Loader active={loader}>
        <Typography color="textSecondary" gutterBottom>
          Current Societies
        </Typography>
        <div>
          {data.map((item) => (
            <div className="society_main my-3 p-2" key={item.id}>
              <div className="society_logo d-flex align-items-center">
                <img src={item.logo} alt="logo" className="img-fluid" />
              </div>
              <div className="society_name">
                <h3>
                  <u>{item.name}</u>
                </h3>
              </div>
              <div className="society_active mr-2">
                <div>
                  {item.is_active ? (
                    <span className="text-info border border-info p-1">
                      Active
                    </span>
                  ) : (
                    <span className="text-danger border border border-danger p-1">
                      Not Active
                    </span>
                  )}
                </div>
              </div>
              <div className="society_teach mr-1">
                <strong>Teacher Incharge:</strong> {item.teacher_incharge}
              </div>
              <div className="society_stud mr-1">
                <strong>Student incharge:</strong> {item.student_incharge}
              </div>
              <div className="society_past">
                <strong>Past events:</strong>
                {item.past_event.length}
              </div>
              <div className="society_upcom">
                <strong>Upcoming events:</strong>
                {item.upcoming_event.length}
              </div>

              <div className="society_buttons d-flex flex-column justify-content-center">
                <button
                  className="btn btn-outline-danger my-1 mx-3 p-1"
                  onClick={() =>
                    swal(
                      "Delete",
                      "Are you sure ?",
                      undefined,
                      ["No", "Yes"],
                      () => handleDelete(item.id)
                    )
                  }
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-primary mx-3 p-1"
                  onClick={() =>
                    history.push({
                      pathname: "UpdateSociety",
                      Soc_Data: item,
                    })
                  }
                >
                  Update
                </button>
                <div class="circle">
                  <ArrowBackIosIcon className="circle_arrow" />
                </div>
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
    </div>
  );
}

export default CurrentSociety;
