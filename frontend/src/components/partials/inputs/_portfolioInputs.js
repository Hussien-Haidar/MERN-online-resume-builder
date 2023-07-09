import { useSelector, useDispatch } from 'react-redux'
import { setPortfolio } from '../../../redux/slices/userSlice';

const PortfolioInputs = () => {
    const portfolio = useSelector((state) => state.user.portfolio || [])
    const dispatch = useDispatch()

    const handleportfolioChange = (index, value) => {
        const updatedportfolios = [...portfolio];
        updatedportfolios[index] = value;
        dispatch(setPortfolio(updatedportfolios));
    };

    const handleAddportfolio = (e) => {
        e.preventDefault()
        dispatch(setPortfolio([...portfolio, '']));
    };

    const handleRemoveportfolio = (index) => {
        const updatedportfolios = [...portfolio];
        updatedportfolios.splice(index, 1);
        dispatch(setPortfolio(updatedportfolios));
    }

    return (
        <div>
            <label>Portfolio</label>
            {portfolio.map((portfolio, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={portfolio}
                        className="content-input"
                        onChange={(e) => handleportfolioChange(index, e.target.value)}
                    />

                    <input type='button' 
                    className="content-delete-input-button" 
                    onClick={() => handleRemoveportfolio(index)}
                    value='remove' />
                </div>
            ))}

            <input type='button'
            className='content-add-input-button' 
            onClick={handleAddportfolio} 
            value='Add Portfolio' />
            
            <br /><br />
        
        </div>
    );
}

export default PortfolioInputs;