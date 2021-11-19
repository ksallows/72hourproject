import { useEffect, useState } from 'react';

function Weather(props) {

    const [currentWeather, setWeather] = useState({
        weather: [
            {
                main: '',
                description: ''
            }
        ],
        main: {
            temp: '',
            feels_like: '',
            temp_min: '',
            temp_max: '',
            humidity: ''
        }
    });
    //why github??
    const [weatherIcon, setWeatherIcon] = useState('');
    const [unit, setUnit] = useState(true); // true = F false = C
    const key = 'eb6b6964864393c4d3a4e0ed1780ea85';
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const toggle = () => setUnit(unit => !unit);

    let getWeather = async () => await fetch(`${baseURL}?lat=${props.lat}&lon=${props.lng}&appid=${key}&units=imperial`)
        .then(result => result.json())
        .then(result => {
            setWeather(result);
            setWeatherIcon(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
        })

    useEffect(() => {
        if (props.lat !== '' && props.lng !== '') getWeather();
        console.log(currentWeather);
    }, [props.lng])

    return (
        <>
            <h1>Weather in {currentWeather.name}</h1>
            <div id='weather-container' className='d-flex flex-row justify-content-between align-items-stretch'>
                <div className=''>
                    <h2 className="display-4"><img src={weatherIcon} alt='' /></h2>
                    <p className="h3">{currentWeather.weather[0].description}</p>
                </div>
                <div className=''>
                    <h2 className="display-4">
                        {unit ? Math.round(currentWeather.main.temp) : Math.round((currentWeather.main.temp - 32) / 1.8)}°
                    </h2>
                    <p className="h3">Temp</p>
                </div>
                <div className=''>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.feels_like) : Math.round((currentWeather.main.feels_like - 32) / 1.8)}°</h2>
                    <p className="h3">Feels Like</p>
                </div>
                <div className=''>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.temp_min) : Math.round((currentWeather.main.temp_min - 32) / 1.8)}°</h2>
                    <p className="h3">Low</p>
                </div>
                <div className=''>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.temp_max) : Math.round((currentWeather.main.temp_max - 32) / 1.8)}°</h2>
                    <p className="h3">High</p>
                </div>
                <div className=''>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.humidity) : Math.round((currentWeather.main.humidity - 32) / 1.8)}%</h2>
                    <p className="h3">Humidity</p>
                </div>
            </div>
            <div id='button'>
                <button type='button' className='btn btn-primary' onClick={() => toggle()}>{unit ? 'Farhenheit' : 'Celsius'}</button>
            </div>
        </>
    );
}

export default Weather;