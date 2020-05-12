import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import {useHistory} from 'react-router-dom'
import CreateNotice from './CreateNotice';

function UpdateNotice() {
    let history=useHistory()
    console.log(history);
    if(!history.location.NoticeData){
        history.push('/admin/Notices')
    }
    return (
        <div>
        <HeadingCard heading={"Update  Notices"} bgcolor={"linear-gradient(to top, #0ba360 0%, #3cba92 100%)"} />
            <CreateNotice NoticeData={history.location.NoticetData}/>
        </div>
    )
}

export default UpdateNotice
