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

function LastTenLinks({data}) {

  return (
    <div className="mt-4">
      
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textSecondary" gutterBottom>
          Last Ten Links
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
                primary={item.link_list.link_text}
                secondary={item.link_list.link}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
        </ExpansionPanelDetails>
        </Loader>
        </ExpansionPanel>
     
    </div>
  );
}

export default LastTenLinks;
