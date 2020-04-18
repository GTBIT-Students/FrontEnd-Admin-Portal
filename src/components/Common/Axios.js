import axios from "axios";
import PNotify from "./PNotify";
import { DecryptToken } from "./Encrypt";

const domain = "https://gtbit-backend.herokuapp.com";

let token, options;
function getToken() {
  console.log("geting tooken");
  var b = document.cookie.match("(^|[^;]+)\\s*" + "token" + "\\s*=\\s*([^;]+)");
  if (b) {
    
    let val=b.pop();

    token = DecryptToken(val);
    options = {
      headers: {
        // Authorization: "Token 5292645558db342649f9c41b50edd7db560962d2",
        Authorization: "Token " + token,
      },
    };
    //console.log("decrypted token:", token);
    //console.log("options:", options);
  } else {
    options = {};
    //console.log("options:", options);
  }
}
getToken();

function AxiosGet(endpoint, handleSuccess) {
  axios
    .get(`${domain}${endpoint}`, options)
    .then((res) => {
      if (res.status === 200) handleSuccess(res);
    })
    .catch((err) => {
      PNotify(); //shows error alert
      console.log(err);
    });
}

function AxiosPost(endpoint, body, handleSuccess) {
  
  axios
    .post(`${domain}${endpoint}`, body, options)
    .then((res) => {
      if (res.status === 200) handleSuccess(res);
    })
    .catch((err) => {
      PNotify(); //shows error alert
      console.log(err);
    });
}

function AxiosDelete(endpoint, handleSuccess) {
  axios
    .delete(`${domain}${endpoint}`, options)
    .then((res) => {
      if (res.status === 200) handleSuccess(res);
    })
    .catch((err) => {
      PNotify(); //shows error alert
      console.log(err);
    });
}

export { AxiosGet, AxiosPost, AxiosDelete };
