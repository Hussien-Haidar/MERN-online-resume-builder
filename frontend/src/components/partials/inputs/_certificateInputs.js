import { useSelector, useDispatch } from 'react-redux'
import { setCertificate } from '../../../redux/slices/contentSlice';

const CertificateInputs = () => {
    const certificate = useSelector((state) => state.content.certificate)
    const dispatch = useDispatch()

    const handlecertificateChange = (index, value) => {
        const updatedcertificates = [...certificate];
        updatedcertificates[index] = value;
        dispatch(setCertificate(updatedcertificates));
    };

    const handleAddcertificate = (e) => {
        e.preventDefault()
        dispatch(setCertificate([...certificate, '']));
    };

    const handleRemovecertificate = (index) => {
        const updatedcertificates = [...certificate];
        updatedcertificates.splice(index, 1);
        dispatch(setCertificate(updatedcertificates));
    }

    return (
        <div>
            <label>Certificates</label>
            {certificate.map((certificate, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={certificate}
                        className="content-input"
                        onChange={(e) => handlecertificateChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemovecertificate(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddcertificate} 
            value='Add Certificate' />
            
            <br /><br />
        
        </div>
    );
}

export default CertificateInputs;