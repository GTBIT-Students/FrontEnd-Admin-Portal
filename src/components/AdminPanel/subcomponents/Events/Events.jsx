import React from 'react'
import CreateEvent from './CreateEvent'
import CurrentEvents from './CurrentEvents'
import HeadingCard from "../../../Common/HeadingCard";

function Events() {
    return (
        <>
       <HeadingCard heading={"Update Events"} bgcolor={"linear-gradient(to right,#fe5d70,#fe909d)"}/>
          <CreateEvent/>
          <CurrentEvents/>  
        </>
    )
}

export default Events
