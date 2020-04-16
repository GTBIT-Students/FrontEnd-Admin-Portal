import React from "react";
import Typography from "@material-ui/core/Typography";
import InputTopNotice from "./InputTopNotice";
import CurrentTopNotice from "./CurrentTopNotice";
import LastTen from "./LastTen";
import Divider from "@material-ui/core/Divider";
import HeadingCard from "../../../Common/HeadingCard";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";

function UpdateTopNotice() {
  const [lastTen, setLastTen] = React.useState([]);
  const [showinput, setShowInput] = React.useState(false);
  let history = useHistory();
  function refresh() {
    history.push("/admin");
    history.push("/admin/UpdateTopNotice");
  }
  function handleInput() {
    setShowInput(!showinput);
  }
  return (
    <div>
      <HeadingCard heading={"Update Top Notice"} />

      <div>
        {showinput && (
          <Fade in>
            <InputTopNotice refresh={refresh} />
          </Fade>
        )}
        <CurrentTopNotice
          setLastTen={setLastTen}
          handleInput={handleInput}
          showinput={showinput}
          refresh={refresh}
        />
        <Divider className="my-4" />
        <LastTen data={lastTen} />
      </div>
    </div>
  );
}

export default UpdateTopNotice;
