import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../Common/Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function LastTen({data}) {


  function converter(date) {
    let d = new Date(date);
    return String(d).slice(0, 16);
  }
  return (
    <>
      
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textSecondary" gutterBottom>
          Last Ten Notices
        </Typography>
        </ExpansionPanelSummary>
        <Loader active={data.length===0}>
        <ExpansionPanelDetails>
        <List>
          {data.map((item) => (
            <ListItem key={item.id} className="p-0">
              <ListItemIcon  style={{ color: "blueviolet",minWidth:'40px' }}>
                <RadioButtonUncheckedIcon
                  fontSize={"small"}
                 
                />
              </ListItemIcon>
              <ListItemText
                primary={item.notice_list.notice}
                secondary={converter(item.notice_list.date)}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
        </ExpansionPanelDetails>
        </Loader>
        </ExpansionPanel>
        {/* <Typography color="textSecondary" gutterBottom>
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
        </List> */}
     
    </>
  );
}

export default LastTen;
