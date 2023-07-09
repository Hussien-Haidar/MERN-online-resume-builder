import { useSelector, useDispatch } from 'react-redux'
import { setProject } from '../../../redux/slices/contentSlice';

const ProjectInputs = () => {
    const project = useSelector((state) => state.content.project)
    const dispatch = useDispatch()

    const handleprojectChange = (index, value) => {
        const updatedprojects = [...project];
        updatedprojects[index] = value;
        dispatch(setProject(updatedprojects));
    };

    const handleAddproject = (e) => {
        e.preventDefault()
        dispatch(setProject([...project, '']));
    };

    const handleRemoveproject = (index) => {
        const updatedprojects = [...project];
        updatedprojects.splice(index, 1);
        dispatch(setProject(updatedprojects));
    }

    return (
        <div>
            <label>Projects</label>
            {project.map((project, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={project}
                        className="content-input"
                        onChange={(e) => handleprojectChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveproject(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddproject} 
            value='Add Project' />
            
            <br /><br />
        
        </div>
    );
}

export default ProjectInputs;