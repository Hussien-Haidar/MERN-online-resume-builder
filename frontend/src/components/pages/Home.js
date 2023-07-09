import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {  setResumes } from '../../redux/slices/resumeSlice';

// components
import ResumeCard from '../../components/partials/_resumeCard.js';
import { Link } from "react-router-dom";
// import resumeForm from '../components/resumeForm';

const Home = () => {
    const { resumes } = useSelector(state => state.resume)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        const fetchresumes = async () => {
            const response = await fetch('/api/resume', {
                headers: {
                    'authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (json.length === 0) {
                setEmpty(true)
            } else {
                setEmpty(false)
            }

            if (response.ok) {
                dispatch(setResumes(json));
            }
        }

        if (user) {
            fetchresumes()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="resumes">
                {resumes && resumes.map((resume) => (
                    <ResumeCard key={resume._id} resume={resume} />
                ))}
                {!resumes && <div><span style={{ color: 'grey' }}>Retrieving Data...</span></div>}
                {empty && <div><Link className="create-resume-link" to='/create'>+ build your first resume</Link></div>}
            </div>
            <Link to='/create'>create resume</Link>
        </div>
    )
}

export default Home