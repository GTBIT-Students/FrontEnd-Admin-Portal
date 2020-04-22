import React from 'react'
import CreateNotice from './CreateNotice'
import CurrentNotices from './CurrentNotices'
import HeadingCard from "../../../Common/HeadingCard";

function Notices() {
    return (
        <div>
         <HeadingCard heading={"Update  Notices"} />
           <CreateNotice/>
           <CurrentNotices/> 
        </div>
    )
}

export default Notices
