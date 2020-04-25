import React from 'react'
import CreateNotice from './CreateNotice'
import CurrentNotices from './CurrentNotices'
import HeadingCard from "../../../Common/HeadingCard";

function Notices() {
    return (
        <div>
         <HeadingCard heading={"Update  Notices"} bgcolor={"linear-gradient(to top, #0ba360 0%, #3cba92 100%)"} />
           <CreateNotice/>
           <CurrentNotices/> 
        </div>
    )
}

export default Notices
