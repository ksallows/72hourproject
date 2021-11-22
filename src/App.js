import Ticketmaster from "./components/Ticketmaster";
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';
import Nasa from './components/Nasa';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Router>
      <div className='container-sm'>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className="nav-link">Weather</Link>
          </li>
          <li className="nav-item">
            <Link to="/satellite" className="nav-link">Satellite</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Weather lat={lat} lng={lng} />} />
          <Route path="/satellite" element={<Nasa lat={lat} lng={lng} />} />
          <Route path="/events" element={<Ticketmaster lat={lat} lng={lng} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
