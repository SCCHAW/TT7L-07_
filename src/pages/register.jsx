import React from 'react';
import { Link } from "react-router-dom";

const IndexSignUpScreen = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      allowExtraEmails: formData.get('allowExtraEmails'),
    });
  };

  return (
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Sign up</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            style={{ width: '100%', padding: 8, marginBottom: 8, height: 40, fontSize: 16 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            style={{ width: '100%', padding: 8, marginBottom: 8,  height: 40, fontSize: 16 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            style={{ width: '100%', padding: 8, marginBottom: 8 ,  height: 40, fontSize: 16}}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{ width: '100%', padding: 8, marginBottom: 8,  height: 40, fontSize: 16}}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <input
              type="checkbox"
              name="allowExtraEmails"
              style={{ marginRight: 5 }}
            />
            I want to receive inspiration, marketing promotions and updates via email.
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: '104%',
            backgroundColor: 'blue',
            color: 'white',
            padding: 10,
            border: 'none',
            borderRadius: 5,
            marginBottom: 16,
            height: 48,
            fontSize: 16
          }}
        >
          Sign Up
        </button>
      </form>
      <div style={{ textAlign: 'center' }}>
     
  
          <p style={{ marginLeft: "5px" }}>
          Already have an account?  <Link to="/signin">Sign in</Link>
            </p>
       
      </div>
    </div>
  );
};

export default IndexSignUpScreen;
