import React from "react";
//Don't remove AppBar
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import useStyles from "./AdminPanelStyle";

import SideBar from "./SideBar";
//stylesProvider inject our custom css first on a wrap component
import { StylesProvider } from "@material-ui/core/styles";

function AdminPanel(props) {
  const classes = useStyles();

  return (
    <StylesProvider injectFirst>
      <div className={classes.root}>
        <CssBaseline />
        {/* <SideBar /> */}
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {[1, 2, 3, 4].map((val) => (
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
          ))}
        </main>
      </div>
    </StylesProvider>
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
