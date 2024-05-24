import React,{useState} from "react";
import "./homepage.css"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import web_logo from '../assets/Assets/treasure-hunt-logo1.jpeg'
import AdminNavHeader from "../adminNav/adminNavHeader";

const Homepage = () => {
    const location = useLocation(); 
    const { userFirstName } = location.state || {};
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleProfile=()=>{ 
        console.log("Profile")
    }

    return (
        <div className="homepage">
            <AdminNavHeader
        navTitle={userFirstName}
        handleAddProduct={handleProfile}
        productCategory={selectedCategory}
        // handleInputChange={handleInputChange}
        
      />
             <img src={web_logo} alt=""/>
           <h1>Welcome {userFirstName}</h1>
           <p>Electronic devices in LOW PRICE!!</p>
        </div>

    )

}

export default Homepage