import React, { useEffect, useState } from "react";
import { AxiosGet, AxiosDelete } from "../../../Common/Axios";
import Loader from "../../../Common/Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import swal from "../../../Common/SwalAlert";
import {useHistory} from 'react-router-dom'
import LastTenLinks from "./LastTenLinks";
import Divider from "@material-ui/core/Divider";

function CurrentImpLinks() {
  let history=useHistory();

  const [data, setData] = useState([]);
  const [MoreData, setMoreData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [moreBtn,setMoreBtn]=useState(true)
  const [lastTenLinks,setLastTen]=useState([])

  useEffect(() => {
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      if (res.data.current_links.length >= 5) {
        let temp = res.data.current_links.slice(0, 5);
        console.log(temp);
        setData(temp);
        setMoreData(res.data.current_links.slice(5));
      } else setData(res.data.current_links);

      setLastTen(res.data.previous_links)
    }

    AxiosGet("/api/v1/important-link-list", handleSuccess, (err) => console.log(err));
  }, []);
useEffect(()=>{
if(moreBtn===false){
  let temp=[...data,...MoreData]
  setData(temp)
}
else
{
  let temp=data.slice(0,5)
  setData(temp)
}
},[moreBtn])
  function handleDelete(id) {
    setLoader(true);
    let body = {
      link_id: id,
    };
    function handleSuccess(res) {
      console.log(res);
      setLoader(false);
      swal("Deleted Successfully", undefined, "success");
      history.push('/')
      history.push('/admin/ImportantLinks')
    }

    function handleErr(err) {
      console.log(err);
      setLoader(false);
      swal("Something Went Wrong", undefined, "error");
    }
    AxiosDelete("/api/v1/important-link-list", body, handleSuccess, handleErr);
  }
  return (
    <div className="mt-4">
      <Loader active={loader}>
        <Typography color="textSecondary" gutterBottom>
          Current Important Links
        </Typography>
        <List dense={true}>
          {data.map((item) => (
            <ListItem key={item.id} className="pl-0">
              <ListItemIcon style={{ color: "blueviolet", minWidth: "35px" }}>
                <RadioButtonUncheckedIcon fontSize={"small"} />
              </ListItemIcon>
              <ListItemText
                primary={item.link_text}
                secondary={item.link}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}

        </List>
        <div>
          {MoreData.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              className="m-auto d-block text-info"
              onClick={()=>setMoreBtn(!moreBtn)}
            >
             {moreBtn?"Show More Links":'Show Less Links'}
            </Button>
          )}
        </div>
      </Loader>

     
      <LastTenLinks data={lastTenLinks} />
    </div>
  );
}

export default CurrentImpLinks;
