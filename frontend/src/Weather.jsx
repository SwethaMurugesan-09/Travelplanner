import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MeteostatData = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://meteostat.p.rapidapi.com/point/monthly', {
                    params: {
                        lat: 52.5244,
                        lon: 13.4105,
                        alt: 43,
                        start: '2020-01-01',
                        end: '2020-12-31'
                    },
                    headers: {
                        'x-rapidapi-key': '46a83165a8msh31524d7da8d4360p142e01jsnf6043d00d364',
                        'x-rapidapi-host': 'meteostat.p.rapidapi.com'
                    }
                });
                setWeatherData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            }
        };

        fetchWeatherData();
    }, []);

    if (error) return <div>{error}</div>;
    if (!weatherData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Monthly Weather Data</h1>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
    );
};

export default MeteostatData;
