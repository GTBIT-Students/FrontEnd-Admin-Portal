import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../Common/Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import axios from "axios";
import domainurl from "../../../Common/Domain";

function LastTen({data}) {
 // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${domainurl}/api/v1/previous-notice-list`)
  //     .then((res) => {
  //       console.log(res);
  //       if(res.status===200)
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function converter(date) {
    let d = new Date(date);
    return String(d).slice(0, 16);
  }
  return (
    <>
      <Loader active={data.length===0}>
        <Typography color="textSecondary" gutterBottom>
          Last Ten Notices
        </Typography>
        <List>
          {data.map((item) => (
            <ListItem key={item.id} className="p-0">
              <ListItemIcon>
                <RadioButtonUncheckedIcon
                  fontSize={"small"}
                  style={{ color: "blueviolet" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.notice_list.notice}
                secondary={converter(item.notice_list.date)}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Loader>
    </>
  );
}

export default LastTen;
