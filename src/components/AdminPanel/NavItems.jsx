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
import { Link } from "react-router-dom";

function NavItems({click}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const ToggleExpand = () => {
    setOpen(!open);
  };
  const navitems = [
    {
      name: "Dashboard",
      route: "/admin",
      icon:<InboxIcon />
    },
    {
      name: "Top Notice",
      route: "/admin/UpdateTopNotice",
      icon:<InboxIcon />
    },
    {
      name: "Carousel",
      route: "/admin/Carousel",
      icon:<InboxIcon />
    },
    {
      name: "Notice/Alerts",
      route: "/admin/Notices",
      icon:<InboxIcon />
    },
    {
      name: "Events",
      route: "/admin/Events",
      icon:<InboxIcon />
    },
    {
      name: "Important Links",
      route: "/admin/ImportantLinks",
      icon:<InboxIcon />
    },
  ];
  return (
    <div>
      <div className={classes.toolbar}>
        <Link to="/admin" className={classes.toptext}>
          {" "}
          <div>Admin Portal</div>
        </Link>
      </div>

      <List>
        {navitems.map((item, index) => (
          <Link to={item.route} className={classes.hoverlight} key={index} onClick={click}>
          <ListItem button >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>
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
   
    </div>
  );
}

export default NavItems;
