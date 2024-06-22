import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogBoxSuccess from "../dialogbox/dialogSuccess";

const IndexUserUpdateProfile = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    profilePicture: "",
  };
  const navigate = useNavigate();
  const [updateUserProfile, setUpdateUserProfile] = useState(initialFormState);
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      console.log("File URL:", url);
      setPreview(URL.createObjectURL(file)); // Create preview image URL

      console.log("file--data", file);
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };


  const handleUpdateForm = async () => {
    //   if (!selectedFile) {
    //       setError('No file selected');
    //       return;
    //   }

      const formData = new FormData();
      formData.append('profileImage', selectedFile);
      formData.append('firstName', updateUserProfile.firstName); 
      formData.append('lastName', updateUserProfile.lastName); 
      try {

          const response = await axios.put(`http://localhost:3000/api/users/${storedUserData.userId}`, formData, {
              headers: {
                "Content-Type": "application/json",
              }
          });

    
         console.log('Upload successful');
          console.log(response.data);
          if(response.data){
            setIsSuccessMessage(response.data.message);
            setIsModalOpen(true);
          }
       
      } catch (error) {
          console.log('Upload failed');
          console.error('Error uploading file:', error);
          setError('Upload failed. Please try again.');
      }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateUserProfile({
      ...updateUserProfile,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/usersProfile");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleCancel();
  };



  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#FFFFE0",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "#000080", marginBottom: "20px" }}>
        Edit Profile Picture
      </h2>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />
      {preview && (
        <img
          src={preview}
          alt="Profile Preview"
          style={{
            width: "200px",
            height: "200px",
            marginTop: "10px",
            borderRadius: "50%",
          }}
        />
      )}
      <br />
      <button
        onClick={()=> {}}
        style={{
          backgroundColor: "#000080",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          marginTop: "20px",
        }}
      >
        Upload
      </button>
      {uploadStatus && (
        <p style={{ color: "green", marginTop: "10px" }}>{uploadStatus}</p>
      )}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder="Enter first name"
          name="firstName"
          value={updateUserProfile.firstName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Enter last name"
          name="lastName"
          value={updateUserProfile.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div style={{marginTop: 60}}>
        <button
          type="submit"
          style={{
            width: "104%",
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 5,
            marginBottom: 16,
            height: 48,
            fontSize: 16,

          }}
          onClick={handleUpdateForm}
        >
          Update Profile
        </button>
      </div>
      <div style={{marginTop: 5}}>
        <button
        onClick={handleCancel}
          type="submit"
          style={{
            width: "104%",
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 5,
            marginBottom: 16,
            height: 48,
            fontSize: 16,

          }}
        >
          Cancel
        </button>
      </div>

      <DialogBoxSuccess
        dialogTitle={"Success"}
        dialogMessage={isSuccessMessage.message || isSuccessMessage}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default IndexUserUpdateProfile;