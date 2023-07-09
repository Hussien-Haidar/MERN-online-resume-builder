const User = require('../models/userModel');
const Resume = require('../models/resumeModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// signup user
const signupUser = async (req, res) => {
    const { fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, password } = req.body;
  
    try {
      const user = await User.signup(fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, password);
  
      // Create a token
      const token = createToken(user._id);
  
      res.status(200).json({ _id: user._id, fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email,
            phoneNumber: user.phoneNumber,
            location: user.location,
            nationality: user.nationality,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            portfolio: user.portfolio,
            profilePicture: user.profilePicture,
            websites: user.websites,
            token
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// update user profile
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        // parameters of the request
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'No such user ' })
    }

    res.status(200).json(user);
}

// get the user data (This method is used in order to fetch the new user data after updating his profile )
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    
    const user = await User.findById(id)

    // create a token
    const token = createToken(user._id)

    if (!user) {
        return res.status(404).json({ error: 'No such user ' })
    }

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        portfolio: user.portfolio,
        profilePicture: user.profilePicture,
        websites: user.websites,
        token
    })
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const resumes = await Resume.find({ user_id: id})

    const deletedResumes = await Resume.deleteMany({ _id: { $in: resumes } });
    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user ' })
    }

    if(!deletedResumes) {
        return res.status(500).json({ error: "Failed to delete user resumes"})
    }

    res.status(200).json(user);
}

module.exports = {
    loginUser,
    signupUser,
    updateUser,
    getUser,
    deleteUser
}