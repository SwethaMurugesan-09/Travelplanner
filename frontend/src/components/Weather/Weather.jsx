import axios from 'axios';
import { useState, useEffect } from 'react';
import './Weather.css';
import rain from '../travel_assets/heavy-rain.png';
import sunny from '../travel_assets/sunny.png';
import cloudy from '../travel_assets/cloudy.png';
import snowy from '../travel_assets/snowy.png';
import weatherBackground from '../travel_assets/weather.jpg';const KEY = "eb6e9c2e1c2f566a14b671788daf3355";
const Weather = ({ city: initialCity, days: initialDays }) => {
    const [city, setCity] = useState(initialCity || "");
    const [days, setDays] = useState(initialDays || 1);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (city && days) {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${KEY}&units=metric`);
                setWeatherData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                alert('Error fetching data');
            } finally {
                setLoading(false);
            }
        }
    };

    // Fetch weather automatically if initialCity and initialDays are provided
    useEffect(() => {
        fetchData();
    }, [city, days]);

    const getWeatherImage = (description) => {
        if (description.includes("rain")) return rain;
        if (description.includes("clear")) return sunny;
        if (description.includes("cloud")) return cloudy;
        if (description.includes("snow")) return snowy;
        return weatherBackground;
    };

    return (
        <div className="weather-total-container">
            <div className="weather-forecast">

            {weatherData && (
                <div className="weather-output-container">
                    {weatherData.list.map((day, index) => (
                        <div className="weather-output" key={index}>
                            <img src={getWeatherImage(day.weather[0].description)} alt={day.weather[0].description} />
                            <h3>Day {index + 1}</h3>
                            <p><strong>Temperature:</strong> {day.main.temp}°C</p>
                            <p><strong>Weather:</strong> {day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}</div>
        </div>
    );
};

export default Weather;

