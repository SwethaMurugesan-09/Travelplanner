import axios from 'axios';
import { useState } from 'react';
import './Weather.css'
const KEY = "eb6e9c2e1c2f566a14b671788daf3355";

const Weather = () => {
    const [city, setCity] = useState(""); // Default city
    const [days, setDays] = useState(); // Default number of days
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);  
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${KEY}&units=metric`);
            setWeatherData(response.data);
            setLoading(false);  
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('Error fetching data');
            setLoading(false); 
        }
    };

    return (
        <div className="weather-total-container">
        <div className="weather-forecast">
            <h1>Weather Forecast</h1>

            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="number"
                min="1"
                max="16" // OpenWeatherMap allows forecasts up to 16 days
                placeholder="Number of days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Weather</button>

            {loading && <p>Loading...</p>}
            </div>

            {weatherData && (
                <div className='weather-output-container'>
                    {weatherData.list.map((day, index) => (
                        <div className='weather-output'  key={index} style={{ margin: '20px 0' }}>
                            <h3>Day {index + 1}</h3>
                            <p><strong>Temperature:</strong> {day.main.temp}°C</p>
                            <p><strong>Weather:</strong> {day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Weather;
