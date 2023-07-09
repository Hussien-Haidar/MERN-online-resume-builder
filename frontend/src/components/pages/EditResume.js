import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { useNavigate } from 'react-router'
import {
    setJobTitle,
    setAboutMe,
    setAward,
    setCertificate,
    setCourse,
    setEducation,
    setExperience,
    setLanguage,
    setOrganization,
    setOther,
    setProject,
    setSkill,
    setWebsite
} from '../../redux/slices/contentSlice'

// import the resume contents inputs
import SkillInputs from '../partials/inputs/_skillInputs'
import EducationInputs from '../partials/inputs/_educationInputs'
import ExperienceInputs from '../partials/inputs/_experienceInputs'
import CertificateInputs from '../partials/inputs/_certificateInputs'
import ProjectInputs from '../partials/inputs/_projectInputs'
import CourseInputs from '../partials/inputs/_courseInputs'
import AwardInputs from '../partials/inputs/_awardInputs'
import OrganizationInputs from '../partials/inputs/_organizationInputs'
import LanguageInputs from '../partials/inputs/_languageInputs'
import WebsiteInputs from '../partials/inputs/_websiteInputs'
import AboutInput from '../partials/inputs/_aboutInput'
import JobTitleInput from '../partials/inputs/_jobTitleInput'
import OtherInputs from '../partials/inputs/_otherInputs'

const EditResume = () => {
    //define the value of each content of the resume
    const jobTitle = useSelector((state) => state.content.jobTitle)
    const aboutMe = useSelector((state) => state.content.aboutMe)
    const education = useSelector((state) => state.content.education)
    const experience = useSelector((state) => state.content.experience)
    const skill = useSelector((state) => state.content.skill)
    const language = useSelector((state) => state.content.language)
    const certificate = useSelector((state) => state.content.certificate)
    const project = useSelector((state) => state.content.project)
    const course = useSelector((state) => state.content.course)
    const award = useSelector((state) => state.content.award)
    const organization = useSelector((state) => state.content.organization)
    const website = useSelector((state) => state.content.website)
    const other = useSelector((state) => state.content.other)

    const { id } = useParams()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const encodedResumeData = queryParams.get('data');
    const resume = JSON.parse(decodeURIComponent(encodedResumeData));

    useEffect(() => {
        dispatch(setJobTitle(resume.jobTitle))
        dispatch(setAboutMe(resume.aboutMe))
        dispatch(setAward(resume.award))
        dispatch(setCertificate(resume.certificate))
        dispatch(setCourse(resume.course))
        dispatch(setEducation(resume.education))
        dispatch(setExperience(resume.experience))
        dispatch(setLanguage(resume.language))
        dispatch(setOrganization(resume.organization))
        dispatch(setOther(resume.other))
        dispatch(setProject(resume.project))
        dispatch(setSkill(resume.skill))
        dispatch(setWebsite(resume.website))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/resume/edit/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.user.token}`
            },
            body: JSON.stringify({
                jobTitle,
                aboutMe,
                education,
                experience,
                skill,
                language,
                certificate,
                project,
                course,
                award,
                organization,
                website,
                other
            })
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
            console.log('resume updated successfully')
            navigate('/me/resume/'+id)
        }
    }

    return (
        <form className="create-resume">
            <h3>Edit Resume</h3>

            <JobTitleInput />

            <AboutInput />

            <EducationInputs />

            <ExperienceInputs />

            <SkillInputs />

            <CertificateInputs />

            <ProjectInputs />

            <CourseInputs />

            <AwardInputs />

            <OrganizationInputs />

            <LanguageInputs />

            <WebsiteInputs />

            <OtherInputs />

            <br /><br />

            {!isLoading && <button className='create-resume-button' style={{ backgroundColor: '#1aac83a4' }} onClick={handleSubmit}>Update</button>}
            {isLoading && <button className='create-resume-button' disabled>please wait...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default EditResume
