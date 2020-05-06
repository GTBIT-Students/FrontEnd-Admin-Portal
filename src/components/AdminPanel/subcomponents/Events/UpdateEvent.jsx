import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import {useHistory} from 'react-router-dom'
import CreateEvent from './CreateEvent';

function UpdateEvent() {
    let history=useHistory()
    console.log(history);
    if(!history.location.EventData){
        history.push('/admin')
    }
    return (
        <div>
        <HeadingCard heading={"Update Events"} bgcolor={"linear-gradient(to right,#fe5d70,#fe909d)"}/>
            <CreateEvent EventData={history.location.EventData}/>
        </div>
    )
}

export default UpdateEvent
