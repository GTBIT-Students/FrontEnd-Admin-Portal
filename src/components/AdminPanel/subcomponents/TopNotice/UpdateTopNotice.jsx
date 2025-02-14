import React from "react";
import InputTopNotice from "./InputTopNotice";
import CurrentTopNotice from "./CurrentTopNotice";
import LastTen from "./LastTenNotices";

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
      <HeadingCard heading={"Update Top Notice"} bgcolor={"linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"}/>

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

        <LastTen data={lastTen} />
      </div>
    </div>
  );
}

export default UpdateTopNotice;
