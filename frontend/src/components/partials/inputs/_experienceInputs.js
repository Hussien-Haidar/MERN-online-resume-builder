import { useSelector, useDispatch } from 'react-redux'
import { setExperience } from '../../../redux/slices/contentSlice';

const ExperienceInputs = () => {
    const experience = useSelector((state) => state.content.experience)
    const dispatch = useDispatch()

    const handleexperienceChange = (index, value) => {
        const updatedexperiences = [...experience];
        updatedexperiences[index] = value;
        dispatch(setExperience(updatedexperiences));
    };

    const handleAddexperience = (e) => {
        e.preventDefault()
        dispatch(setExperience([...experience, '']));
    };

    const handleRemoveexperience = (index) => {
        const updatedexperiences = [...experience];
        updatedexperiences.splice(index, 1);
        dispatch(setExperience(updatedexperiences));
    }

    return (
        <div>
            <label>Experience</label>
            {experience.map((experience, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={experience}
                        className="content-input"
                        onChange={(e) => handleexperienceChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveexperience(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddexperience} 
            value='Add Experience' />
            
            <br /><br />
        
        </div>
    );
}

export default ExperienceInputs;