const mongoose = require('mongoose');

const Schema = mongoose.Schema

const resumeSchema = new Schema({
    jobTitle: { type: String, required: true },
    aboutMe: { type: String },
    education: { type: Array },
    experience: { type: Array },
    skill: { type: Array },
    language: { type: Array },
    certificate: { type: Array },
    project: { type: Array },
    course: { type: Array },
    award: { type: Array },
    organization: { type: Array },
    website: { type: Array },
    other: { type: Object },
    user_id: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Resume', resumeSchema)