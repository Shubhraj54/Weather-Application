import { useState } from 'react';
import './weather.css'

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    let back = 'https://cdn.pixabay.com/photo/2023/10/28/09/20/darling-8346954_1280.jpg';
    const API_KEY = '9b6934db7d01dac32403788ffc519c7c'; 

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log(response);
            

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
    };

    return (
        <div className='container'     style={{ backgroundImage: `url(${back})` }}>
            <form onSubmit={handleSubmit}>
                <div className='container-1'>
                    <label>City_Name:</label>
                    <input type="text" value={city} onChange={handleChange} placeholder="Enter city..." />
                </div>
                <button type="submit">Get Weather</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div className='weather-info'>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
