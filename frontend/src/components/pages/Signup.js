import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/userSlice'
import PortfolioInputs from '../partials/inputs/_portfolioInputs'

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [nationality, setNationality] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState('');

    const portfolio = useSelector((state) => state.user.portfolio)

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if (password !== confirmedPassword) {
            setIsLoading(false)
            setError('Passwords do not matches')
            return
        }

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            setError(null)

            //save the user to local storage
            localStorage.setItem('user', JSON.stringify({ json }))

            // save/dispatch the auth to the store
            dispatch(login(json))

            console.log('new user added!')
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                setProfilePicture(reader.result)
            };
            reader.onerror = error => {
                console.log(error)
            }
        }
        else {
            setProfilePicture('')
        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Profile Image</label>
            <input type='file' accept='image/*' onChange={handleFileChange} />

            {profilePicture && (<img width={100} src={profilePicture} alt="" />)}

            <label>Full Name <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} />

            <label>Email <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="email" placeholder='Type your contact email_' onChange={(e) => setEmail(e.target.value)} value={email} />

            <label>Gender <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <select onChange={(e) => setGender(e.target.value)} value={gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br /><br />

            <label>Date of Birth <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} />

            <label>Nationality</label>
            <input type="text" onChange={(e) => setNationality(e.target.value)} value={nationality} />

            <label>Location <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />

            <label>Phone Number <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />

            <PortfolioInputs />

            <label>Password <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

            <label>Confirm Password <span style={{ fontSize: 12, color: 'grey', fontWeight: '600' }}>required</span></label>
            <input type="password" onChange={(e) => setConfirmedPassword(e.target.value)} value={confirmedPassword} />

            {!isLoading && <button>Sign up</button>}
            {isLoading && <button disabled style={{ backgroundColor: '#1aac83a4' }}>Signing up...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
}

export default Signup;