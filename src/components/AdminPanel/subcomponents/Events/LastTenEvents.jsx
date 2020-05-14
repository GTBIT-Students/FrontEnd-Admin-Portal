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

function LastTenEvents({data}) {


  function converter(date) {
    let d = new Date(date);
    return String(d).slice(0, 16);
  }
  return (
    <div className="mt-4">
      
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textSecondary" gutterBottom>
          Last Ten Events
        </Typography>
        </ExpansionPanelSummary>
        <Loader active={data.length===0}>
        <ExpansionPanelDetails className="p-1">
        <div className="w-100">
          {data.map((item) => (
            <div key={item.id} className="CurrentDataContainer">
              <RadioButtonUncheckedIcon
                className="mx-3"
                style={{ color: "blueviolet",fontSize:'.9rem' }}
              />
              <div>{item.event_list.event_name}</div>
              </div>
          ))}
        </div>
        </ExpansionPanelDetails>
        </Loader>
        </ExpansionPanel>
     
    </div>
  );
}

export default LastTenEvents;
