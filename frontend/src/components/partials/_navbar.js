import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { emptyContents } from '../../redux/slices/contentSlice'
import { emptyResumes } from '../../redux/slices/resumeSlice'
import { useState } from 'react'

const Navbar = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleViewProfile = () => {
        navigate('/profile')
        setIsOpen(false);
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(emptyContents())
        dispatch(emptyResumes())
        setIsOpen(false);
    }

    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Online Resume Builder</h1>
                </Link>
                <nav>
                    {user && (<div className="dropdown">
                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                            <div className="dropdown-content">
                                {user && user.profilePicture ? (
                                    <img className="navbar-picture" src={user.profilePicture} alt="" />
                                ) : (
                                    <img className="navbar-picture" src={process.env.PUBLIC_URL + '/images/empty.jpg'} alt="" />
                                )}
                                <span>{user && user.email}</span>
                            </div>
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={handleViewProfile}>
                                    View Profile
                                </button>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>)}

                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;