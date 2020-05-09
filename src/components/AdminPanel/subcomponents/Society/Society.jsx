import React from 'react'
import HeadingCard from "../../../Common/HeadingCard";
import CreateSociety from './CreateSociety';
import CurrentSociety from './CurrentSociety';
function Society() {
    return (
        <div>
            <HeadingCard heading={"Society"} bgcolor={"linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"}/>

            <CreateSociety/>
            <CurrentSociety/>
        </div>
    )
}

export default Society
