import { useState } from "react"
import { useSelector } from "react-redux"
import html2pdf from 'html2pdf.js'

const Template1 = ({ resume }) => {
    const user = useSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDownload = async () => {
        setIsLoading(true)
        const resumeTemplate = document.getElementById('resume-template');

        const opt = {
            filename: user.fullName + ' resume.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: 'px', format: [595, 842] }
        };

        try {
            await html2pdf().set(opt).from(resumeTemplate).save();
            setIsLoading(false)
        } catch (err) {
            setError(err.message)
            console.log(err.message)
        }
    }

    return (
        <div>
            {!isLoading && (
                <button className="download-button" onClick={handleDownload}>
                    <div className="button-content">
                        <img src={process.env.PUBLIC_URL + '/images/pdf.png'} alt="" />
                        <span>Export</span>
                    </div>
                </button>
            )}
            {isLoading && (
                <button className="download-button" disabled>
                    <div className="button-content">
                        <img src={process.env.PUBLIC_URL + '/images/pdf.png'} alt="" />
                        <span>Exporting</span>
                    </div>
                </button>
            )}
            {error && <div className='error'>{error}</div>}

            <div id="resume-template">
                {/* Main Page */}
                <div className="resume-template main-paper">
                    <div className="resume-template-body-1">
                        {user.profilePicture
                            ? <img className='resume-template-profile-picture' src={user.profilePicture} alt='' />
                            : <img className='resume-template-profile-picture' src={process.env.PUBLIC_URL + '/images/empty.jpg'} alt='' />}

                        <span className='resume-template-fullname'>{user.fullName.toUpperCase()}</span><br />
                        <span className='resume-template-job-title'>{resume.jobTitle.toUpperCase()}</span><br /><br />

                        <div className='resume-template-personal-info'>
                            <div style={{ display: 'flex', alignItems: 'center', height: '17px' }}>
                                <img className='resume-template-personal-logo' src={process.env.PUBLIC_URL + '/images/email.png'} alt='' />
                                <a href={'mailto:' + user.email}>{user.email}</a><br />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', height: '17px' }}>
                                <img style={{ color: 'white' }} className='resume-template-personal-logo' src={process.env.PUBLIC_URL + '/images/phone.png'} alt='' />
                                <span style={{ cursor: 'pointer' }}>{user.phoneNumber}</span><br />
                            </div>

                            {user.nationality && (
                                <div style={{ display: 'flex', alignItems: 'center', height: '17px' }}>
                                    <img className='resume-template-personal-logo' src={process.env.PUBLIC_URL + '/images/nationality.png'} alt='' />
                                    <span style={{ cursor: 'pointer' }}>{user.nationality}</span><br />
                                </div>)}

                            <div style={{ display: 'flex', alignItems: 'center', height: '17px' }}>
                                <img className='resume-template-personal-logo' src={process.env.PUBLIC_URL + '/images/location.png'} alt='' />
                                <span style={{ cursor: 'pointer' }}>{user.location}</span><br />
                            </div>

                            {/* portfolios */}
                            {user.portfolio.length > 0 && (
                                <div>
                                    {user.portfolio.map((portfolio, index) => (
                                        <div style={{ display: 'flex', alignItems: 'center', height: '17px' }}>
                                            <img className='resume-template-personal-logo' src={process.env.PUBLIC_URL + '/images/portfolio.png'} alt='' />
                                            <a key={index} href={portfolio} target="_blank" rel="noreferrer">{portfolio}</a><br />
                                        </div>
                                    ))}
                                    <br />
                                </div>
                            )}
                        </div><br />

                        <div>
                            {/* skill content */}
                            {resume.skill.length > 0 && (
                                <div>
                                    <strong>SKILLS</strong>
                                    {resume.skill.map((skill, index) => (
                                        <div><strong>. </strong><span key={index}>{skill}</span><br /></div>
                                    ))}
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="resume-template-body-2">
                        {/* about content */}
                        {resume.aboutMe.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>ABOUT
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/about.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    <span>{resume.aboutMe}</span>
                                </div>
                            </div>
                        )}

                        {/* education content */}
                        {resume.education.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>EDUCATION HISTORY
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/education.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    <span>{resume.education}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Body Page */}
                <div className="resume-template-body body-paper">
                    <div className="resume-template-body-page">
                        {/* experience content */}
                        {resume.experience.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>EXPERIENCE
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/experience.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.experience.map((experience, index) => (
                                        <div><span key={index} href={experience}><strong>. </strong>{experience}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* project content */}
                        {resume.project.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>PROJECTS
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/project.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.project.map((project, index) => (
                                        <div><span key={index} href={project}><strong>. </strong>{project}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* organization content */}
                        {resume.organization.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>ORGANIZATION
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/organization.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.organization.map((organization, index) => (
                                        <div><span key={index} href={organization}><strong>. </strong>{organization}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* course content */}
                        {resume.course.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>COURSES
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/course.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.course.map((course, index) => (
                                        <div><span key={index} href={course}><strong>. </strong>{course}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* certificate content */}
                        {resume.certificate.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>CERTIFICATIONS
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/certificate.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.certificate.map((certificate, index) => (
                                        <div><span key={index} href={certificate}><strong>. </strong>{certificate}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* award content */}
                        {resume.award.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>HONORS & AWARDS
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/award.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.award.map((award, index) => (
                                        <div><span key={index} href={award}><strong>. </strong>{award}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* website content */}
                        {resume.website.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>WEBSITE
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/website.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.website.map((website, index) => (
                                        <div><a target='_blank' rel="noreferrer" href={website}><span key={index} href={website}><strong>. </strong>{website}</span></a><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* language content */}
                        {resume.language.length > 0 && (
                            <div>
                                <h5 className='resume-template-content-title'>LANGUAGES
                                    <img className='resume-template-content-logo' src={process.env.PUBLIC_URL + '/images/language.png'} alt='' />
                                </h5>
                                <div className='resume-template-content'>
                                    {resume.language.map((language, index) => (
                                        <div><span key={index} href={language}><strong>. </strong>{language}</span><br /></div>
                                    ))}<br />
                                </div>
                            </div>
                        )}

                        {/* other contents */}
                        {resume.other.length > 0 && (
                            <div>{resume.other.map((item, index) => (
                                <div key={index}>
                                    <h5 className='resume-template-content-title'>{item.contentTitle}</h5>
                                    <div className='resume-template-content'>
                                        <span>{item.contentBody}</span>
                                        <br />
                                    </div>
                                </div>
                            ))}<br />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template1;