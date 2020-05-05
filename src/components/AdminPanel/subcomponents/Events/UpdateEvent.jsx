import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import {useHistory} from 'react-router-dom'

function UpdateEvent() {
    let history=useHistory()
    console.log(history);
    return (
        <div>
        <HeadingCard heading={"Update Events"} bgcolor={"linear-gradient(to right,#fe5d70,#fe909d)"}/>
            
        </div>
    )
}

export default UpdateEvent
