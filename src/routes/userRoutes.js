const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// POST route to upload profile picture
router.post('/uploadProfilePicture', async (req, res) => {
    try {
        const { userId, profilePicture } = req.body; // Assuming userId and profilePicture URL are passed in the request body

        // Update user's profile picture URL in database
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });

        // Respond with updated user object
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error uploading profile picture:', err);
        res.status(500).json({ message: 'Failed to upload profile picture' });
    }
});

module.exports = router;
