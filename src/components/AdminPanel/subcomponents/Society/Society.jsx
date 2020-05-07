import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import CreateSociety from './CreateSociety';
function Society() {
    return (
        <div>
            <HeadingCard heading={"Society"} bgcolor={"linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"}/>

            <CreateSociety/>
        </div>
    )
}

export default Society
