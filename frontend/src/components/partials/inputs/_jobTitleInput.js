import { useSelector, useDispatch } from 'react-redux'
import { setJobTitle } from '../../../redux/slices/contentSlice'

const JobTitleInput = () => {
    const jobTitle = useSelector((state) => state.content.jobTitle)
    const dispatch = useDispatch()
    return (
        <div>
            <label>Job Title <span style={{ fontSize: '12px', color: 'gray' }}>required</span></label>
            <input type="text" onChange={(e) => dispatch(setJobTitle(e.target.value))} value={jobTitle} />
        </div>
    );
}

export default JobTitleInput;