import { useSelector, useDispatch } from 'react-redux'
import { setWebsite } from '../../../redux/slices/contentSlice';

const WebsiteInputs = () => {
    const website = useSelector((state) => state.content.website)
    const dispatch = useDispatch()

    const handlewebsiteChange = (index, value) => {
        const updatedwebsites = [...website];
        updatedwebsites[index] = value;
        dispatch(setWebsite(updatedwebsites));
    };

    const handleAddwebsite = (e) => {
        e.preventDefault()
        dispatch(setWebsite([...website, '']));
    };

    const handleRemovewebsite = (index) => {
        const updatedwebsites = [...website];
        updatedwebsites.splice(index, 1);
        dispatch(setWebsite(updatedwebsites));
    }

    return (
        <div>
            <label>Website</label>
            {website.map((website, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={website}
                        className="content-input"
                        onChange={(e) => handlewebsiteChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemovewebsite(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddwebsite} 
            value='Add Website' />
            
            <br /><br />
        
        </div>
    );
}

export default WebsiteInputs;