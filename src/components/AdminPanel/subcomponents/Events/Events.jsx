import React from 'react'
import CreateEvent from './CreateEvent'
import CurrentEvents from './CurrentEvents'
import HeadingCard from "../../../Common/HeadingCard";

function Events() {
    return (
        <>
       <HeadingCard heading={"Update Events"} />
          <CreateEvent/>
          <CurrentEvents/>  
        </>
    )
}

export default Events
