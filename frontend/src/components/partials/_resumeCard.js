import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ResumeCard = ({ resume }) => {

    return (
        <div className="resume-details">
            <Link to={`/me/resume/${resume._id}`} style={{ textDecoration: 'none'}}><h4>{resume.jobTitle}</h4></Link>
            <p><strong>About Me: </strong></p>
            <p className="about-me">{resume.aboutMe}</p><br/>
            <p style={{ marginTop: 'auto' }}>{formatDistanceToNow(new Date(resume.createdAt), { addSuffix: true })}</p>
        </div>
    );
}

export default ResumeCard;