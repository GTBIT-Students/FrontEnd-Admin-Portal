import axios from 'axios'
const domain ='https://gtbit-backend.herokuapp.com'
const options={
    headers:{
      Authorization: "Token 5292645558db342649f9c41b50edd7db560962d2",
    }
  }

function AxiosGet(){
    axios
    .get(`${domain}/api/v1/upper-notice`,options)
    .then((res) => {
      console.log(res);
     if(res.status===200)
     return res
    })
    .catch((err) => {
      return err
    });
}

export {AxiosGet}