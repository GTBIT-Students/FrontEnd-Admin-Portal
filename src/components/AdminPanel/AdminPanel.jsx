import React from "react";
//Don't remove AppBar
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import useStyles from "./AdminPanelStyle";
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Route,
  Link,
} from "react-router-dom";
import SideBar from "./SideBar";
//stylesProvider inject our custom css first on a wrap component
import { StylesProvider } from "@material-ui/core/styles";
import AdminRoutes from "./AdminRoutes";
import { Row, Col } from "react-bootstrap";
import DashCard from "../Common/DashCard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LinkIcon from "@material-ui/icons/Link";
import EventIcon from "@material-ui/icons/Event";

const cards = [
  {
    heading: "Top Notice",
    bgcolor: "#f44336",
    icon: <NotificationsIcon className="d-block" style={{ width: "4rem", height: "4rem" }}/>,
  },
  {
    heading: "Carousel",
    bgcolor: "#9575CD",
    icon: <ViewCarouselIcon className="d-block" style={{ width: "4rem", height: "4rem" }} />,
  },
  {
    heading: "Notices/Alerts",
    bgcolor: "#FFB300",
    icon: <ListAltIcon className="d-block" style={{ width: "4rem", height: "4rem" }}/>,
  },
  {
    heading: "Important links",
    bgcolor: "#795548",
    icon: <LinkIcon className="d-block" style={{ width: "4rem", height: "4rem" }} />,
  },
  {
    heading: "Events",
    bgcolor: "#424242",
    icon: <EventIcon className="d-block" style={{ width: "4rem", height: "4rem" }} />,
  },
];
function AdminPanel(props) {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <Router>
      <StylesProvider injectFirst>
        <div className={classes.root}>
          <CssBaseline />
          {/* <SideBar /> */}
          <SideBar />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Switch>
              <Route exact path={path}>
                <Row>
                  {cards.map((card,index) => (
                    <Col
                      xs={"12"}
                      sm={"6"}
                      md={"4"}
                      
                      key={index}
                      className="my-3"
                    >
                      <DashCard
                        heading={card.heading}
                        bgcolor={card.bgcolor}
                        icon={card.icon}
                      />
                    </Col>
                  ))}
                </Row>
              </Route>
              <Route path={`${path}/:params`}>
                <AdminRoutes />
              </Route>
            </Switch>

            {/* {[1, 2, 3, 4].map((val) => (
            <Typography paragraph key={val}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
          ))} */}
          </main>
        </div>
      </StylesProvider>
    </Router>
  );
}

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   container: PropTypes.any,
// };

export default AdminPanel;
