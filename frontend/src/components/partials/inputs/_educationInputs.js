import { useSelector, useDispatch } from 'react-redux'
import { setEducation } from '../../../redux/slices/contentSlice';

const EducationInputs = () => {
    const education = useSelector((state) => state.content.education)
    const dispatch = useDispatch()

    const handleeducationChange = (index, value) => {
        const updatededucations = [...education];
        updatededucations[index] = value;
        dispatch(setEducation(updatededucations));
    };

    const handleAddeducation = (e) => {
        e.preventDefault()
        dispatch(setEducation([...education, '']));
    };

    const handleRemoveeducation = (index) => {
        const updatededucations = [...education];
        updatededucations.splice(index, 1);
        dispatch(setEducation(updatededucations));
    }

    return (
        <div>
            <label>Education</label>
            {education.map((education, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={education}
                        className="content-input"
                        onChange={(e) => handleeducationChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveeducation(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddeducation} 
            value='Add Education' />
            
            <br /><br />
        
        </div>
    );
}

export default EducationInputs;