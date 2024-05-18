import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginSignup.css';
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";

import user_icon from '../assets/Assets/person.png';
import email_icon from '../assets/Assets/email.png';
import password_icon from '../assets/Assets/password.png';
import axios from "axios";


const LoginSignup = () => {
    const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
    const navigate = useNavigate();
    const [dialogFormError, setDialogFormError] = useState(false)
    const [dialogFormSuccess, setDialogFormSuccess] = useState(false)
const [loginSignupFormData, setLoginSignupFormData] = useState(initialFormState)
    const [action, setAction] = useState("Login");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async () => {

        console.log("login") 
        if(!loginSignupFormData.email || !loginSignupFormData.password
         ){
            setErrorMessage("All fields are required")
            setDialogFormError(true)
            return
         } 
         if (!emailRegex.test(loginSignupFormData.email)) {
            setErrorMessage("Invalid email format.");
            setDialogFormError(true);
            return;
          }
        //   if (!user.loginSignupFormData.email ) {
        //     setErrorMessage("Invalid Email and Password");
        //     setDialogFormError(true);
        //     return;
        //   }

        //   if (!passwordMatch.loginSignupFormData.password ) {
        //     setErrorMessage("Invalid Email and Password");
        //     setDialogFormError(true);
        //     return;
        //   }

        try {
            const user = {
          email: loginSignupFormData.email,
          password: loginSignupFormData.password,
              };

              console.log(user)
              const response = await axios.post("http://localhost:3000/api/login",user,{
                headers: {
                    "Content-Type": "application/json",
                  },
                })
                if (response.data)
                    {
                        console.log(response.data)
                        if (response.data.firstName === "Admin"){
                            setSuccessMessage("Admin Successfully Login")
                        setDialogFormSuccess(true)
                            navigate("/admin")
                            
                        } else{
                            setSuccessMessage("Login Successful")
                        setDialogFormSuccess(true)
                        navigate("/home");
                        }
                        
                    }
        } catch (error) {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
            setDialogFormError(true)
        }
        
    
        
       
    };

    const handleToggleAction = () => {
        setAction((prevAction) => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    };

    const handleSignup =async () => {
        console.log("signup") 
        if(!loginSignupFormData.firstName || !loginSignupFormData.lastName || !loginSignupFormData.email || !loginSignupFormData.password
            || !loginSignupFormData.confirmPassword
         ){
            setErrorMessage("All fields are required")
            setDialogFormError(true)
            return
         } 
         if (!emailRegex.test(loginSignupFormData.email)) {
            setErrorMessage("Invalid email format.");
            setDialogFormError(true);
            return;
          }
          if (loginSignupFormData.password !== loginSignupFormData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setDialogFormError(true);
            return;
          }

        try {
            const user = {
                firstName: loginSignupFormData.firstName,
          lastName: loginSignupFormData.lastName,
          email: loginSignupFormData.email,
          password: loginSignupFormData.password,
              };

              console.log(user)
              const response = await axios.post("http://localhost:3000/api/users",user,{
                headers: {
                    "Content-Type": "application/json",
                  },
                })
                if (response.data)
                    {
                        setDialogFormSuccess(true)
                        setSuccessMessage("Registration Successful")
                        setLoginSignupFormData(initialFormState);
                        setAction("Login");

                    }
        } catch (error) {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
            setDialogFormError(true)
        }
        
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
       setLoginSignupFormData({
          ...loginSignupFormData,
          [name]: value,
        });
      };



    return (
        <div className="background">
            <div className="container">
                <div className="header">
                    <div className="text">{action === "Login" ? "Login" : "Sign up"}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={user_icon} alt=""/>
                            <input type="text" name="firstName" placeholder="Firstname" value={loginSignupFormData.firstName} onChange={handleInputChange}/>
                        </div>
                    )}
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={user_icon} alt=""/>
                            <input type="text" name="lastName" placeholder="Lastname" value={loginSignupFormData.lastName} onChange={handleInputChange}/>
                        </div>
                    )}
                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email" name="email" placeholder="Email Address" value={loginSignupFormData.email} onChange={handleInputChange}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" name="password" placeholder="Password" value={loginSignupFormData.password} onChange={handleInputChange}/>
                    </div>

                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={password_icon} alt=""/>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={loginSignupFormData.confirmPassword} onChange={handleInputChange}/>
                        </div>
                    )}
                </div>
                {action === "Login" && (<div className="forgot-password">Forgot password? <span>Click Here!</span></div>
)}
             {/* error Dialog box */}
       {dialogFormError && (
         <ReactDialogBox
         closeBox={() => setDialogFormError(false)}
            modalWidth="60%"
            headerBackgroundColor="red"
            headerTextColor="white"
            headerHeight="65"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="200px"
            headerText="Error"
        >
          <h2>{errorMessage.error || errorMessage}</h2>
        </ReactDialogBox>

      )}

{dialogFormSuccess && (
         <ReactDialogBox
         closeBox={() => setDialogFormSuccess(false)}
            modalWidth="60%"
            headerBackgroundColor="green"
            headerTextColor="white"
            headerHeight="65"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="200px"
            headerText="Congrats"
        >
          <h2>{successMessage.message || successMessage}</h2>
        </ReactDialogBox>

      )}

                {action === "Sign Up" ? (
                    <div className="navigatepage">Already have an account? <span onClick={handleToggleAction}>Login now</span></div>
                ) : (
                    <div className="navigatepage">Don’t have an account? <span onClick={handleToggleAction}>Sign up now</span></div>
                )}
                <div className="submit-container">
                    {action === "Sign Up" ? (
                        <div className="submit" onClick={handleSignup}>Sign Up</div>
                    ) : (
                        <div className="submit" onClick={handleLogin}>Login</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;