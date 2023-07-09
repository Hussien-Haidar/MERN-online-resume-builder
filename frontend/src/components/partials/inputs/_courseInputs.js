import { useSelector, useDispatch } from 'react-redux'
import { setCourse } from '../../../redux/slices/contentSlice';

const CourseInputs = () => {
    const course = useSelector((state) => state.content.course)
    const dispatch = useDispatch()

    const handlecourseChange = (index, value) => {
        const updatedcourses = [...course];
        updatedcourses[index] = value;
        dispatch(setCourse(updatedcourses));
    };

    const handleAddcourse = (e) => {
        e.preventDefault()
        dispatch(setCourse([...course, '']));
    };

    const handleRemovecourse = (index) => {
        const updatedcourses = [...course];
        updatedcourses.splice(index, 1);
        dispatch(setCourse(updatedcourses));
    }

    return (
        <div>
            <label>Course</label>
            {course.map((course, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={course}
                        className="content-input"
                        onChange={(e) => handlecourseChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemovecourse(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddcourse} 
            value='Add Course' />
            
            <br /><br />
        
        </div>
    );
}

export default CourseInputs;