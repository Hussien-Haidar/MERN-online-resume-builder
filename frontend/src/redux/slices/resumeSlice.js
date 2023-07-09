import { createSlice } from '@reduxjs/toolkit'

export const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumes: null,
    },
    reducers: {
        setResumes: (state, action) => {
            state.resumes = action.payload;
        },
        emptyResumes: (state, action) => {
            state.resumes = null
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setResumes,
    emptyResumes
} = resumeSlice.actions;

export default resumeSlice.reducer