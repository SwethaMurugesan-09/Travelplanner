import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css'
import Navbar from '../Navbar/Navbar';
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(1);

  // Fetch exchange rates from an API (replace with your own API key)
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies([...Object.keys(data.rates)]);
        setRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  // Convert the amount
  const convert = () => {
    setConvertedAmount((amount * rate).toFixed(2));
  };

  return (
    <div className="currency-conteiner">
    <div className="converter">
      <h1>Currency Converter</h1>
      <div className="input-section">
        <div className="input-container">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="convert-btn" onClick={convert}>
        Convert
      </button>

      <h2 className='converter-text'>
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </h2>
    </div></div>
  );
};

export default CurrencyConverter;