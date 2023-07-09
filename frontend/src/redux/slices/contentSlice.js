import { createSlice } from '@reduxjs/toolkit'

export const contentSlice = createSlice({
    name: 'content',
    initialState: {
        jobTitle: '',
        aboutMe: '',
        education: [],
        experience: [],
        skill: [],
        language: [],
        certificate: [],
        interest: [],
        project: [],
        course: [],
        award: [],
        organization: [],
        website: [],
        reference: [],
        other: [],
    },
    reducers: {
        setJobTitle: (state, action) => {
            state.jobTitle = action.payload;
        },
        setAboutMe: (state, action) => {
            state.aboutMe = action.payload;
        },
        setEducation: (state, action) => {
            state.education = action.payload;
        },
        setExperience: (state, action) => {
            state.experience = action.payload;
        },
        setSkill: (state, action) => {
            state.skill = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setCertificate: (state, action) => {
            state.certificate = action.payload;
        },
        setInterest: (state, action) => {
            state.interest = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setAward: (state, action) => {
            state.award = action.payload;
        },
        setOrganization: (state, action) => {
            state.organization = action.payload;
        },
        setWebsite: (state, action) => {
            state.website = action.payload;
        },
        setReference: (state, action) => {
            state.reference = action.payload;
        },
        setOther: (state, action) => {
            state.other = action.payload;
        },
        emptyContents: (state, action) => {
            state.jobTitle = ''
            state.aboutMe = ''
            state.award = []
            state.certificate = []
            state.course = []
            state.education = []
            state.experience = []
            state.language = []
            state.organization = []
            state.other = []
            state.project = []
            state.skill = []
            state.website = []
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setJobTitle,
    setAboutMe,
    setEducation,
    setExperience,
    setSkill,
    setCertificate,
    setProject,
    setCourse,
    setAward,
    setOrganization,
    setWebsite,
    setLanguage,
    setOther,
    emptyContents
} = contentSlice.actions;

export default contentSlice.reducer