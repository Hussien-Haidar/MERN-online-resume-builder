import { useSelector, useDispatch } from 'react-redux'
import { setAboutMe } from '../../../redux/slices/contentSlice'

const AboutInput = () => {
    const aboutMe = useSelector((state) => state.content.aboutMe)
    const dispatch = useDispatch()

    return (
        <div>
            <label>About:</label>
            <textarea maxLength='1024' placeholder='You can type 1024 characters only_' onChange={(e) => dispatch(setAboutMe(e.target.value))} value={aboutMe} />
            <br /><br />
        </div>
    )
}

export default AboutInput