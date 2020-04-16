import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Divider from "@material-ui/core/Divider";
import MailIcon from "@material-ui/icons/Mail";
import useStyles from "./AdminPanelStyle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";

function NavItems() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const ToggleExpand = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={classes.toolbar}>
      <div className={classes.toptext} >Admin Portal</div>
      </div>
     
      <List>
        {["Dashboard", "Mails", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} className={classes.hoverlight} />
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem button onClick={ToggleExpand}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" className={classes.hoverlight} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} className={classes.hoverlight} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NavItems;
