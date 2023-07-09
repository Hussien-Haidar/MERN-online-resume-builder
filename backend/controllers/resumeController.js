const Resume = require('../models/resumeModel');
const mongoose = require('mongoose');

// get all Resumes
const getResumes = async (req, res) => {
    const user_id = req.user._id

    const resumes = await Resume.find({ user_id }).sort({ createAt: -1 });
    try {
        res.status(200).json(resumes);
    } catch (error) {
        res.status(400).json(error);
    }
}

// get a single Resume
const getResume = async (req, res) => {
    const { id } = req.params

    //use isValid method to check if the id is 12 digit or 24 hex and to handle it instead of crashing the server
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Resume' })
    }

    const resume = await Resume.findById(id);

    if (!resume) {
        return res.status(404).json({ error: 'No such Resume ' })
    }

    res.status(200).json(resume)
}

// create a new Resume
const createResume = async (req, res) => {
    const {
        jobTitle,
        aboutMe,
        education,
        experience,
        skill,
        language,
        certificate,
        project,
        course,
        award,
        organization,
        website,
        other
    } = req.body

    if(jobTitle === '') {
        return res.status(400).json({ error: "Job title field is missing" })
    }

    // add doc to db
    try {
        //req.user is stored while coding in the backend folder in the requireAuth.js
        const user_id = req.user._id
        const resume = await Resume.create({
            jobTitle,
            aboutMe,
            education,
            experience,
            skill,
            language,
            certificate,
            project,
            course,
            award,
            organization,
            website,
            other,
            user_id
        })
        res.status(200).json(resume)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a Resume
const deleteResume = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Resume' })
    }

    const resume = await Resume.findOneAndDelete({ _id: id })

    if (!resume) {
        return res.status(404).json({ error: 'No such Resume ' })
    }

    res.status(200).json(resume);
}

// update a Resume
const updateResume = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Resume' })
    }

    const resume = await Resume.findOneAndUpdate({ _id: id }, {
        // parameters of the request
        ...req.body
    })

    if (!resume) {
        return res.status(404).json({ error: 'No such Resume ' })
    }

    res.status(200).json(resume);
}

// export controllers
module.exports = {
    getResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume
}