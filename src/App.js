import './App.scss';
import WeatherAPI from './WeatherAPI';
import { useEffect, useState } from 'react';

function App() {
  const [units, setUnits] = useState('metric');
  const [location, setLocation] = useState('');
  const [temp, setTemp] = useState();
  const [weatherDesc, setWeatherDesc] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => { setCoordinates([pos.coords.latitude, pos.coords.longitude]); }, (err) => { console.error(err); setLocation('London')});
  }, []);

  useEffect(() => {
    if (location) {
      WeatherAPI.getCoordinates(location).then(response => {
        setCoordinates([response[0].lat, response[0].lon]);
      });
    }
  }, [location, setLocation]);

  useEffect(() => {
    if (coordinates.length) {
      WeatherAPI.getLocation(coordinates[0], coordinates[1]).then(response => {
        setLocation(response[0].local_names.feature_name);
      });

      WeatherAPI.getWeatherData(coordinates[0], coordinates[1], units).then(response => {
        setTemp(response.current.temp);
        setWeatherDesc(response.current.weather[0].description);
      });
    }
  }, [coordinates, setCoordinates, units, setUnits])

  return (
    <main>
      <h1>{ location }</h1>
      <h2>{ weatherDesc }</h2>
    </main>
  );
}

export default App;
