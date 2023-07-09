import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user'))?.json,
        fullName: JSON.parse(localStorage.getItem('user'))?.json.fullName,
        email: JSON.parse(localStorage.getItem('user'))?.json.email,
        gender: JSON.parse(localStorage.getItem('user'))?.json.gender,
        dateOfBirth: JSON.parse(localStorage.getItem('user'))?.json.dateOfBirth,
        nationality: JSON.parse(localStorage.getItem('user'))?.json.nationality,
        location: JSON.parse(localStorage.getItem('user'))?.json.location,
        phoneNumber: JSON.parse(localStorage.getItem('user'))?.json.phoneNumber,
        portfolio: JSON.parse(localStorage.getItem('user'))?.json.portfolio,
        profilePicture: JSON.parse(localStorage.getItem('user'))?.json.profilePicture
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.fullName = action.payload.fullName
            state.email = action.payload.email
            state.gender = action.payload.gender
            state.dateOfBirth = action.payload.dateOfBirth
            state.nationality = action.payload.nationality
            state.location = action.payload.location
            state.phoneNumber = action.payload.phoneNumber
            state.portfolio = action.payload.portfolio
            state.profilePicture = action.payload.profilePicture

            console.log('Login successfull')
            console.log('redirecting...')
        },
        logout: (state, action) => {
            //remove user from storage
            localStorage.removeItem('user')
            state.user = null
            state.fullName = null
            state.email = null
            state.gender = null
            state.dateOfBirth = null
            state.nationality = null
            state.location = null
            state.phoneNumber = null
            state.portfolio = []
            state.profilePicture = null

            state.user = null;
            console.log('user logged out')
        },
        setUser: (state, action) => {
            state.user = action.payload

            //edit the user in local storage
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify({ json: action.payload }))
        },
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setDateOfBirth: (state, action) => {
            state.dateOfBirth = action.payload;
        },
        setNationality: (state, action) => {
            state.nationality = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setPortfolio: (state, action) => {
            state.portfolio = action.payload;
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    login,
    logout,
    setUser,
    setFullName,
    setGender,
    setDateOfBirth,
    setNationality,
    setLocation,
    setPhoneNumber,
    setPortfolio,
    setProfilePicture
} = userSlice.actions;

export default userSlice.reducer