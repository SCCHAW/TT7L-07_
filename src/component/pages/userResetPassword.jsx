import React, { useEffect, useState } from "react";
import "./userResetPassword.css"
import { useParams, useNavigate, Link } from 'react-router-dom';

import password_icon from '../assets/Assets/password.png';
import DialogBoxError from "../dialogbox/dialogError";
import axios from "axios";
import DialogBoxSuccess from "../dialogbox/dialogSuccess";

const UserResetPassword =()=>{

    const initialFormState = {
        password: "",
        confirmPassword:"",
      };

      const { token } = useParams();
  console.log('token', token)
  const navigate = useNavigate()

      const [resetPasswordFormData, setResetPasswordFormData] = useState(initialFormState)
      const [dialogFormError, setDialogFormError] = useState(false)
      const [dialogFormSuccess, setDialogFormSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setResetPasswordFormData({
          ...resetPasswordFormData,
          [name]: value,
        });
      };

      

      const handleResetPassword = async()=>{
        if (!resetPasswordFormData.password || !resetPasswordFormData.confirmPassword) {
            setErrorMessage("All fields are required");
            setDialogFormError(true);
            return;
          }
      
          if(resetPasswordFormData.password !== resetPasswordFormData.confirmPassword){
              setErrorMessage("Confirm Password does not match");
              setDialogFormError(true);
              return;
          }

          try {
      
            const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`,{password: resetPasswordFormData.password}, {
                headers: {
                    "Content-Type": "application/json",
                  },
            })
    
            console.log('response', response);
          if (response.data) {
            setSuccessMessage(response.data.message);
            setDialogFormSuccess(true);
           
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


    return(
        <div className="container">
            <div className="header password-forget">
                    <div className="text">Reset Password</div>
                </div>
           <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" name="password" placeholder="Enter Password" value={resetPasswordFormData.password} onChange={handleInputChange}/>
                    </div>

                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" value={resetPasswordFormData.confirmPassword} onChange={handleInputChange}/>
                    </div>

                    <div className="submit-container">
                   
                        <div className="submit" onClick={handleResetPassword}>Submit</div>
                        
            
                   
                </div>
                 <DialogBoxError errorTitle={"error"} errorMessage={errorMessage.error || errorMessage} handleCloseModalError={handleCloseModalError} isDialogOpenError={dialogFormError} />
                <DialogBoxSuccess dialogTitle={"Success"} dialogMessage={successMessage.message || successMessage} isModalOpen={dialogFormSuccess} handleCloseModal={handleCloseModal}/> 
        </div>

    )
}

export default UserResetPassword