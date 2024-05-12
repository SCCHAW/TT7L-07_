import React, { useState } from "react";
import { Link } from "react-router-dom";

const IndexLoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "1",
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "lightgrey", // Default background color
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div style={{ flex: "1", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                marginBottom: "20px",
                padding: "6px",
                width: "100%",
                height: 48,
                fontSize: 16,
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                marginBottom: "10px",
                padding: "6px",
                width: "100%",
                height: 48,
                fontSize: 16
              }}
            />
        
            <button
              type="submit"
              style={{
                backgroundColor: "blue",
                color: "white",
                height: 48,
                border: "none",
                borderRadius: "5px",
                marginTop: "20px",
                width: "104%",
                padding: 16,
                fontSize: 18,
              }}
            >
              Sign In
            </button>
          </form>
          
          <div
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
          >
            <p style={{ marginRight: "5px" }}>Forget password?</p>
            <span>|</span>
            <p style={{ marginLeft: "5px" }}>
               Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexLoginScreen;



