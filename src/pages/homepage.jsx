import React from "react";
import "./homepage.css"

import web_logo from '../assets/Assets/treasure-hunt-logo1.jpeg'

const homePage = () => {

    return (
        <div className="homepageBar">
            <div className="barHeader">
                <img src={web_logo} alt=""/>
                <div className="Bartext">Treasure Hunt</div>
            </div>
        </div>
    )

}
