import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import format from 'date-fns/format';

// Import the reducers from the user slice
import {
    setUser,
    setFullName,
    setGender,
    setDateOfBirth,
    setLocation,
    setNationality,
    setPhoneNumber,
    setProfilePicture
} from "../../redux/slices/userSlice";

const EditProfile = () => {
    const user = useSelector((state) => state.user)
    const user_id = user.user._id

    const fullName = useSelector((state) => state.user.fullName)
    const gender = useSelector((state) => state.user.gender)
    const dateOfBirth = useSelector((state) => state.user.dateOfBirth) ?? '2000-01-01T00:00:00.000Z'
    const nationality = useSelector((state) => state.user.nationality)
    const location = useSelector((state) => state.user.location)
    const phoneNumber = useSelector((state) => state.user.phoneNumber)
    const profilePicture = useSelector((state) => state.user.profilePicture)

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleClick = async (e) => {
        setIsLoading(true)
        setError('');
        setSuccess('')
        e.preventDefault();

        const response = await fetch('/api/user/edit/' + user_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.user.token}`
            },
            body: JSON.stringify({ fullName, gender, dateOfBirth, nationality, location, phoneNumber, profilePicture })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            setSuccess('')
            console.log(json.error)
        } else {
            setIsLoading(false)
            setError(null)
            setSuccess('Profile edited successfully')
            console.log('Profile edited successfully')

            // Fetch the updated user data after editing
            const userResponse = await fetch('/api/user/' + user_id, {
                headers: {
                    'Authorization': `Bearer ${user.user.token}`
                }
            });

            const updatedUser = await userResponse.json();

            // Dispatch the setUser action with the updated user data
            dispatch(setUser(updatedUser));
        }
    }

    const handleRemovePicture = () => {
        dispatch(setProfilePicture(""))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                dispatch(setProfilePicture(reader.result))
            };
            reader.onerror = error => {
                console.log(error)
            }
        }
        else {
            dispatch(setProfilePicture(''))
        }
    }

    return (
        <div className="profile-details" style={{ padding: "30px" }}>
            <label>Profile Image</label>
            <input type='file' accept='image/*' onChange={handleFileChange} />

            {profilePicture && (<img width={100} src={profilePicture} alt="" />)}<br />
            {profilePicture && (
                <div>
                    <button className="delete-account-button" onClick={handleRemovePicture}>remove</button>
                    <br /><br />
                </div>
            )}

            <label>Full Name</label>
            <input type="text" onChange={(e) => dispatch(setFullName(e.target.value))} value={fullName} /><br />

            <label>Gender</label>
            <select onChange={(e) => dispatch(setGender(e.target.value))} value={gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br /><br />

            <label>Date of Birth</label>
            <input type="date" onChange={(e) => dispatch(setDateOfBirth(e.target.value))}
                value={format(new Date(dateOfBirth), ('yyyy-MM-dd'))} /><br />

            <label>Nationality</label>
            <input type="text" onChange={(e) => dispatch(setNationality(e.target.value))} value={nationality} /><br />

            <label>Location</label>
            {profilePicture && (<div><input type="text" onChange={(e) => dispatch(setLocation(e.target.value))} value={location} /><br /></div>)}

            <label>Phone Number</label>
            <input type="text" onChange={(e) => dispatch(setPhoneNumber(e.target.value))} value={phoneNumber} /> <br />

            {!isLoading && <button className="profile-edit-button" onClick={handleClick}>Edit</button>}
            {isLoading && <button className="profile-edit-button" disabled style={{ backgroundColor: '#1aac83a4' }}>please wait...</button>}
            {error && <div className='error'>{error}</div>}
            {success && <div className='success'>{success}</div>}
        </div>
    );
};

export default EditProfile;