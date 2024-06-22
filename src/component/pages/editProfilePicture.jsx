import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditProfilePicture = () => {
  const { user } = useSelector(state => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Create preview image URL
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    formData.append('userId', user.id); // Ensure user.id is correct
  
    try {
      const response = await axios.post('http://localhost:3000/api/user/uploadProfilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Upload successful');
      console.log(response.data);
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error('Error uploading file:', error);
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center', backgroundColor: '#FFFFE0', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ color: '#000080', marginBottom: '20px' }}>Edit Profile Picture</h2>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '20px' }} />
      {preview && <img src={preview} alt="Profile Preview" style={{ width: '200px', height: '200px', marginTop: '10px', borderRadius: '50%' }} />}
      <br />
      <button onClick={handleUpload} style={{ backgroundColor: '#000080', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', marginTop: '20px' }}>Upload</button>
      {uploadStatus && <p style={{ color: 'green', marginTop: '10px' }}>{uploadStatus}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default EditProfilePicture;
