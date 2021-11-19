//import './App.css';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Nasa from './components/Nasa';

function App() {

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const getLocation = () => navigator.geolocation.getCurrentPosition(successPosition, errorPosition, { enableHighAccuracy: true, timeout: 10000 });

  const successPosition = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  const errorPosition = () => console.log('Error getting location data.')

  useEffect(() => {
    getLocation();
    console.log(`Lat: ${lat}, Lng: ${lng}`);
  })

  return (
    <div>
      <Weather lat={lat} lng={lng} />
      <Nasa lat={lat} lng={lng} />
    </div>
  );
}

export default App;