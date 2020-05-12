import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import {useHistory} from 'react-router-dom'
import CreateSociety from './CreateSociety';

function UpdateEvent() {
    let history=useHistory()
    console.log(history);
    if(!history.location.Soc_Data){
        history.push('/admin/Society')
    }
    return (
        <div>
        <HeadingCard heading={"Society"} bgcolor={"linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"}/>
            <CreateSociety Soc_Data={history.location.Soc_Data}/>
        </div>
    )
}

export default UpdateEvent
