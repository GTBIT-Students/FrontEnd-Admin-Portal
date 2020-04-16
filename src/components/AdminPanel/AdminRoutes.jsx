import React from 'react'
import {useParams} from 'react-router-dom'
import UpdateTopNotice from './subcomponents/TopNotice/UpdateTopNotice';

function AdminRoutes() {
    const {params}=useParams();
   console.log(params);
    switch (params) {
        case 'UpdateTopNotice':
            return <UpdateTopNotice/>
            break;
    
        default:
            return <h1>404 Not Found</h1>
            break;
    }
}

export default AdminRoutes
