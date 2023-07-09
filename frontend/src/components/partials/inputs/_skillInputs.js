import { useSelector, useDispatch } from 'react-redux'
import { setSkill } from '../../../redux/slices/contentSlice';

const SkillInputs = () => {
    const skill = useSelector((state) => state.content.skill)
    const dispatch = useDispatch()

    const handleskillChange = (index, value) => {
        const updatedskills = [...skill];
        updatedskills[index] = value;
        dispatch(setSkill(updatedskills));
    };

    const handleAddskill = (e) => {
        e.preventDefault()
        dispatch(setSkill([...skill, '']));
    };

    const handleRemoveskill = (index) => {
        const updatedskills = [...skill];
        updatedskills.splice(index, 1);
        dispatch(setSkill(updatedskills));
    }

    return (
        <div>
            <label>Skills</label>
            {skill.map((skill, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={skill}
                        className="content-input"
                        onChange={(e) => handleskillChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveskill(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddskill} 
            value='Add Skill' />
            
            <br /><br />
        
        </div>
    );
}

export default SkillInputs;