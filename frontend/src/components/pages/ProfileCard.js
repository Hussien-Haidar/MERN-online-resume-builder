import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { logout } from '../../redux/slices/userSlice';
import { emptyContents } from '../../redux/slices/contentSlice';
import { emptyResumes } from '../../redux/slices/resumeSlice';

const ProfileCard = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const handleDeleteAccount = async () => {
        setDeleting(true)

        const response = await fetch('/api/user/delete/' + user.user._id, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${user.user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setDeleting(false);
            setError(json.error)
            console.log(error);
        }
        if (response.ok) {
            setDeleting(false);
            setError(null)
            console.log('user deleted')

            //remove every related info from local storage
            dispatch(logout())
            dispatch(emptyContents())
            dispatch(emptyResumes())
        }
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>User Profile Card</h2>

            <div className="card">
                <div className='profile-info'>
                    <b>Full Name: </b><span>{user.user.fullName}</span><br /><br />
                    {user.user.nationality && (<div><b>Nationality: </b><span>{user.user.nationality}</span><br /><br /></div>)}
                    <b>Gender: </b><span>{user.user.gender}</span><br /><br />
                    <b>Date of Birth: </b><span>{format(new Date(user.user.dateOfBirth), ('dd/MM/yyyy'))}</span><br /><br />
                    <b>Location: </b><span>{user.user.location}</span><br /><br />
                    <b>Email: </b><span>{user.user.email}</span><br /><br />
                    <b>Phone Number: </b><span>{user.user.phoneNumber}</span><br />
                </div>

                <div className='profile-image'>
                    {user.user.profilePicture
                        ? <img style={{ height: '150px', width: '150px' }} src={user.user.profilePicture} alt='' />
                        : <img style={{ height: '150px', width: '150px' }} src={process.env.PUBLIC_URL + '/images/empty.jpg'} alt='' />}

                    {!deleting && (<div><button className="delete-account-button" onClick={handleDeleteAccount}>
                        Delete Account
                    </button></div>)}
                    {deleting && (<div><button className="delete-account-button" style={{ backgroundColor: '#ac1a1a62' }} disabled>
                        please wait...
                    </button></div>)}
                </div>
                <p><Link to='/profile/edit' className="profile-edit-link" >Edit</Link></p>
            </div>
        </div>
    )
}

export default ProfileCard;