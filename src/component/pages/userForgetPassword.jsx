import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userForgetPassword.css"
import AdminNavHeader from "../adminNav/adminNavHeader";
import { useDispatch } from 'react-redux';

import user_icon from '../assets/Assets/person.png';
import email_icon from '../assets/Assets/email.png';
import password_icon from '../assets/Assets/password.png';
import DialogBoxError from "../dialogbox/dialogError";
import axios from "axios";
import DialogBoxSuccess from "../dialogbox/dialogSuccess";



const UserForgetPassword =()=> {

    const initialFormState = {
       
        email: "",
        
      };
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [dialogFormError, setDialogFormError] = useState(false)
        const [dialogFormSuccess, setDialogFormSuccess] = useState(false)
    const [loginSignupFormData, setLoginSignupFormData] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
       setLoginSignupFormData({
          ...loginSignupFormData,
          [name]: value,
        });
      };

      const handleForgetPassword = async ()=>{
        if( !loginSignupFormData.email 
         ){
            setErrorMessage("Email is required")
            setDialogFormError(true)
            return
         } 
         if (!emailRegex.test(loginSignupFormData.email)) {
            setErrorMessage("Invalid email format.");
            setDialogFormError(true);
            return;
          }

          try {
            const response = await axios.post("http://localhost:3000/api/forgot-password",{email:loginSignupFormData.email},{
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            console.log(response.data)
            if(response.data){
                setSuccessMessage(response.data.message)
                setDialogFormSuccess(true)
                
                
              }
            } catch (error) {
              setErrorMessage(error.response.data);
              setDialogFormError(true);
              console.log("error 1", error.response.data);
              console.log("error2, ", error.response);
            }
          

      }

      
      const handleCloseModalError = () => {
        setDialogFormError(false);
      };

      
      const handleCloseModal = () => {
        setDialogFormSuccess(false);
                        navigate("/");
      };

      const handleCancel =()=> {
        navigate("/")
      }

    return(
        <div className="container">
            <div className="header password-forget">
                    <div className="text">Forget Password</div>
                </div>
           <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email" name="email" placeholder="Email Address" value={loginSignupFormData.email} onChange={handleInputChange}/>
                    </div>

                    <div className="submit-container">
                   
                        <div className="submit" onClick={handleForgetPassword}>Submit</div>
                        <div className="submit" onClick={handleCancel}>Cancel</div>
            
                   
                </div>
                <DialogBoxError errorTitle={"error"} errorMessage={errorMessage.error || errorMessage} handleCloseModalError={handleCloseModalError} isDialogOpenError={dialogFormError} />
                <DialogBoxSuccess dialogTitle={"Success"} dialogMessage={successMessage.message || successMessage} isModalOpen={dialogFormSuccess} handleCloseModal={handleCloseModal}/>
        </div>
    )

}



export default UserForgetPassword 