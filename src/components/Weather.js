import { useEffect, useState } from 'react';

function Weather(props) {

    const [weather, setWeather] = useState({});

    const key = 'eb6b6964864393c4d3a4e0ed1780ea85';

    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

    let getWeather = () => fetch(`${baseURL}?lat=${props.lat}&lon=${props.lng}&appid=${key}`)
        .then(result => result.json())
        .then(result => { setWeather(result); console.log(result) })

    useEffect(() => {
        if (props.lat !== '' && props.lng !== '') getWeather();
    }, [props.lng])

    return (
        <div>
            <h2>Weather in {weather.name}</h2>
        </div>
    );
}

export default Weather;