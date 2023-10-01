import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css'; // Import your custom CSS file



const Currency = () => {
    const { currency, dispatch } = useContext(AppContext);
    const [newCurrency, setNewCurrency] = useState(currency);
    const handleCurrencyChange = (event) => {
        setNewCurrency(event.target.value);

        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value});
    }
    return (
<div className="custom-select-dropdown">

  Currency: 
  <select  value={newCurrency} onChange={handleCurrencyChange}>
  <option className="drop-down-style" value="$">$ Dollar</option>
  <option className="drop-down-style2" value="£"> £ Pound</option>
  <option className="drop-down-style" value="€">€ Euro</option>
  <option className="drop-down-style2" value="₹">₹ Ruppee</option>
</select>



</div>






    );
};
export default Currency;