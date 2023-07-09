import { useSelector, useDispatch } from 'react-redux'
import { setOther } from '../../../redux/slices/contentSlice'

const OtherInputs = () => {
    const other = useSelector((state) => state.content.other)
    const dispatch = useDispatch()

    const handleOtherChange = (index, field, value) => {
        const updatedOthers = [...other]
        updatedOthers[index] = {
            ...updatedOthers[index],
            [field]: value,
        };
        dispatch(setOther(updatedOthers))
    };

    const handleAddOther = (e) => {
        e.preventDefault()
        dispatch(setOther([...other, { contentTitle: '', contentBody: '' }]))
    };

    const handleRemoveOther = (index) => {
        const updatedOthers = [...other]
        updatedOthers.splice(index, 1)
        dispatch(setOther(updatedOthers))
    };

    return (
        <div>
            <label>Other Content</label>
            {other.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder='Content title'
                        value={item.contentTitle}
                        className="content-input"
                        onChange={(e) => handleOtherChange(index, 'contentTitle', e.target.value)}
                    />
                    <textarea
                        value={item.contentBody}
                        placeholder='Type your content body here_'
                        className="content-input"
                        onChange={(e) => handleOtherChange(index, 'contentBody', e.target.value)}
                    />

                    <input
                        type="button"
                        className="content-delete-input-button"
                        onClick={() => handleRemoveOther(index)}
                        value="Remove"
                    />
                </div>
            ))}

            <input
                type="button"
                className="content-add-input-button"
                onClick={handleAddOther}
                value="Add Other Content"
            />

            <br /><br />
        </div>
    );
};

export default OtherInputs;