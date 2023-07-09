import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../../../redux/slices/contentSlice';

const LanguageInputs = () => {
    const language = useSelector((state) => state.content.language)
    const dispatch = useDispatch()

    const handlelanguageChange = (index, value) => {
        const updatedlanguage = [...language];
        updatedlanguage[index] = value;
        dispatch(setLanguage(updatedlanguage));
    };

    const handleAddlanguage = (e) => {
        e.preventDefault()
        dispatch(setLanguage([...language, '']));
    };

    const handleRemovelanguage = (index) => {
        const updatedlanguage = [...language];
        updatedlanguage.splice(index, 1);
        dispatch(setLanguage(updatedlanguage));
    }

    return (
        <div>
            <label>Languages</label>
            {language.map((language, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={language}
                        className="content-input"
                        onChange={(e) => handlelanguageChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemovelanguage(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddlanguage} 
            value='Add Language' />
            
            <br /><br />
        
        </div>
    );
}

export default LanguageInputs;