import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';

const ResumeDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    const [deleting, setDeleting] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`/api/resume/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    setResume(json);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError('Failed to fetch resume');
                }
            } catch (error) {
                setLoading(false);
                setError('An error occurred');
            }
        };

        if (user) {
            fetchResume();
        }
    }, [id, user])

    const handleClick = async (e) => {
        e.preventDefault();
        setDeleting(true);

        if (!user) {
            setError('You must be logged in')
            return
        }

        const response = await fetch('/api/resume/' + resume._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
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
            console.log('resume deleted')
            navigate('/')
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleViewResume = () => {
        navigate('/view/resume/' + id);
    };

    const handleEditResume = () => {
        const encodedResumeData = encodeURIComponent(JSON.stringify(resume));
        navigate(`/view/resume/edit/${id}?data=${encodedResumeData}`);
      };

    return (
        <div className="resume-details">
            {resume ? (
                <>
                    <h4>{resume.jobTitle}</h4>

                    <h3 style={{ textAlign: 'center' }}>Personal Information <span className='resume-details-title-span'>profile data</span></h3>


                    <p><strong>Full Name</strong></p>
                    <p>{user.fullName}</p><br />

                    <p><strong>Gender</strong></p>
                    <p>{user.gender}</p><br />

                    <p><strong>Date of Birth</strong></p>
                    <p>{format(new Date(user.dateOfBirth), ('dd/MM/yyyy'))}</p><br />

                    <p><strong>Nationality</strong></p>
                    <p>{user.nationality}</p><br />

                    <p><strong>Location</strong></p>
                    <p>{user.location}</p><br />

                    <p><strong>Email</strong></p>
                    <p>{user.email}</p><br />

                    <p><strong>Phone Number</strong></p>
                    <p>{user.phoneNumber}</p><br />

                    <hr />
                    <h3 style={{ textAlign: 'center' }}>Contents of Resume</h3>

                    {resume.aboutMe.length > 0 && (
                        <div><p><strong>About</strong></p>
                            <p>{resume.aboutMe}</p><br />
                        </div>
                    )}

                    {resume.education.length > 0 && (
                        <div>
                            <p><strong>Education</strong></p>
                            {resume.education.map((education, index) => (
                                <p key={index}>{education}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.experience.length > 0 && (
                        <div>
                            <p><strong>Experience</strong></p>
                            {resume.experience.map((experience, index) => (
                                <p key={index}>{experience}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.skill.length > 0 && (
                        <div>
                            <p><strong>Skills</strong></p>
                            {resume.skill.map((skill, index) => (
                                <p key={index}>{skill}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.certificate.length > 0 && (
                        <div>
                            <p><strong>Certificates</strong></p>
                            {resume.certificate.map((certificate, index) => (
                                <p key={index}>{certificate}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.project.length > 0 && (
                        <div>
                            <p><strong>Projects</strong></p>
                            {resume.project.map((project, index) => (
                                <p key={index}>{project}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.course.length > 0 && (
                        <div>
                            <p><strong>Courses</strong></p>
                            {resume.course.map((course, index) => (
                                <p key={index}>{course}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.award.length > 0 && (
                        <div>
                            <p><strong>Awards</strong></p>
                            {resume.award.map((award, index) => (
                                <p key={index}>{award}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.organization.length > 0 && (
                        <div>
                            <p><strong>Organization</strong></p>
                            {resume.organization.map((organization, index) => (
                                <p key={index}>{organization}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.language.length > 0 && (
                        <div>
                            <p><strong>Languages</strong></p>
                            {resume.language.map((language, index) => (
                                <p key={index}>{language}</p>
                            ))}
                            <br />
                        </div>
                    )}

                    {resume.website.length > 0 && (
                        <div>
                            <p><strong>Website</strong></p>
                            {resume.website.map((website, index) => (
                                <a target="_blank" rel="noopener noreferrer" href={website} key={index}>{website}</a>
                            ))}
                            <br />
                        </div>
                    )}

                    <br /><br />

                    <hr />
                    <h3 style={{ textAlign: 'center' }}>Extra Contents <span className='resume-details-title-span'>other contents</span></h3>

                    {resume.other.map((other, index) => (
                        <div key={index}>
                            <p><strong>{other.contentTitle}</strong></p>
                            <p>{other.contentBody}</p>
                            <br />
                        </div>
                    ))}

                    <br /><br />

                    <p>Time Created: {formatDistanceToNow(new Date(resume.createdAt), { addSuffix: true })}</p>
                    {
                        resume.createdAt !== resume.updatedAt
                            ? (<p>Last Time Updated: {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}</p>)
                            : (<p>Last Time Updated: Not Yet</p>)
                    }

                    < button className='resume-details-view-button' onClick={handleViewResume} > view resume</button>
                    <button className='resume-details-edit-button' onClick={handleEditResume}>edit resume</button>

                    {!deleting && <button className='resume-details-delete-button' onClick={handleClick}>delete</button>}
                    {deleting && <button style={{ color: 'grey', backgroundColor: 'whitesmoke' }}>delete</button>}
                </>
            ) : (<div>resume not found</div>)
            }
        </div >
    );
}

export default ResumeDetails;