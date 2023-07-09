import { useSelector, useDispatch } from 'react-redux'
import { setAward } from '../../../redux/slices/contentSlice';

const AwardInputs = () => {
    const award = useSelector((state) => state.content.award)
    const dispatch = useDispatch()

    const handleawardChange = (index, value) => {
        const updatedawards = [...award];
        updatedawards[index] = value;
        dispatch(setAward(updatedawards));
    };

    const handleAddaward = (e) => {
        e.preventDefault()
        dispatch(setAward([...award, '']));
    };

    const handleRemoveaward = (index) => {
        const updatedawards = [...award];
        updatedawards.splice(index, 1);
        dispatch(setAward(updatedawards));
    }

    return (
        <div>
            <label>Awards</label>
            {award.map((award, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={award}
                        className="content-input"
                        onChange={(e) => handleawardChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveaward(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddaward} 
            value='Add Award' />
            
            <br /><br />
        
        </div>
    );
}

export default AwardInputs;