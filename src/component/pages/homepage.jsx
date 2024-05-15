import React from "react";
import "./homepage.css"

import web_logo from '../assets/Assets/treasure-hunt-logo1.jpeg'

const homepage = () => {

    return (
        <div className="homepage">
             <img src={web_logo} alt=""/>
           <h1>Welcome to Treasure Hunt!</h1>
           <p>Electronic devices in LOW PRICE!!</p>
        </div>
    )

}

export default homepage