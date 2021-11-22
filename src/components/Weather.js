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

    const icons = {
        i01d: 'sun-fill',                    //clear sky
        i02d: 'cloud-fill',                  //few clouds
        i03d: 'cloud-sun-fill',              //scattered clouds
        i04d: 'clouds-fill',                  //broken clouds
        i09d: 'cloud-rain-fill',              //shower rain
        i10d: 'cloud-rain-heavy-fill',        //rain
        i11d: 'cloud-lightning-rain-fill',    //thunderstorm
        i13d: 'cloud-snow-fill',              //snow
        i50d: 'cloud-haze-fill'               //mist
    }

    const [unit, setUnit] = useState(true); // true = F false = C
    const key = 'eb6b6964864393c4d3a4e0ed1780ea85';
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const toggle = () => setUnit(!unit);

    let getWeather = async () => await fetch(`${baseURL}?lat=${props.lat}&lon=${props.lng}&appid=${key}&units=imperial`)
        .then(result => result.json())
        .then(result => {
            setWeather(result);
            document.getElementById('icon').classList.add('bi-' + icons[`i${result.weather[0].icon}`]);
            console.log(icons[`i${result.weather[0].icon}`]);
        })

    useEffect(() => {
        if (props.lat !== '' && props.lng !== '') getWeather();
        console.log(currentWeather);
    }, [props.lng])

    return (
        <>
            <h1>Weather in {currentWeather.name}</h1>
            <div id='weather-container' className='d-flex flex-row justify-content-between align-items-stretch'>
                <div>
                    <h2><i id='icon'></i></h2>
                    <p className="h3">{currentWeather.weather[0].description}</p>
                </div>
                <div>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.temp) : Math.round((currentWeather.main.temp - 32) / 1.8)}&deg;
                    </h2>
                    <p className="h3">Temp</p>
                </div>
                <div>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.feels_like) : Math.round((currentWeather.main.feels_like - 32) / 1.8)}&deg;</h2>
                    <p className="h3">Feels Like</p>
                </div>
                <div>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.temp_min) : Math.round((currentWeather.main.temp_min - 32) / 1.8)}&deg;</h2>
                    <p className="h3">Low</p>
                </div>
                <div>
                    <h2 className="display-4">{unit ? Math.round(currentWeather.main.temp_max) : Math.round((currentWeather.main.temp_max - 32) / 1.8)}&deg;</h2>
                    <p className="h3">High</p>
                </div>
                <div>
                    <h2 className="display-4">{Math.round(currentWeather.main.humidity)}%</h2>
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