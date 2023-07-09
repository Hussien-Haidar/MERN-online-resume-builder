import { useSelector, useDispatch } from 'react-redux'
import { setOrganization } from '../../../redux/slices/contentSlice';

const OrganizationInputs = () => {
    const organization = useSelector((state) => state.content.organization)
    const dispatch = useDispatch()

    const handleorganizationChange = (index, value) => {
        const updatedorganization = [...organization];
        updatedorganization[index] = value;
        dispatch(setOrganization(updatedorganization));
    };

    const handleAddorganization = (e) => {
        e.preventDefault()
        dispatch(setOrganization([...organization, '']));
    };

    const handleRemoveorganization = (index) => {
        const updatedorganization = [...organization];
        updatedorganization.splice(index, 1);
        dispatch(setOrganization(updatedorganization));
    }

    return (
        <div>
            <label>organization</label>
            {organization.map((organization, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={organization}
                        className="content-input"
                        onChange={(e) => handleorganizationChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveorganization(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddorganization} 
            value='Add organization' />
            
            <br /><br />
        
        </div>
    );
}

export default OrganizationInputs;