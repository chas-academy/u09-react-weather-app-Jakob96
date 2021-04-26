import './App.scss';
import WeatherAPI from './WeatherAPI';
import { useEffect, useState } from 'react';
import WeatherConditions from './components/weatherConditions/index';
import WeatherDetails from './components/weatherDetails/index';
import WeatherForecast from './components/weatherForecast/index';
import { Button } from 'grommet';

function App() {
  const [units, setUnits] = useState('metric');
  const [location, setLocation] = useState('');
  const [temp, setTemp] = useState(0);
  const [weatherId, setWeatherId] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [weatherHourly, setWeatherHourly] = useState([]);
  const [weatherDaily, setWeatherDaily] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => { setCoordinates([pos.coords.latitude, pos.coords.longitude]); }, (err) => { console.error(err); setLocation('London')});
  }, []);

  useEffect(() => {
    if (locationSearch) {
      WeatherAPI.getCoordinates(locationSearch).then(response => {
        if (response.length) {
          setCoordinates([response[0].lat, response[0].lon]);
        }
      })
    }
  }, [locationSearch, setLocationSearch])

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
        setLocation(response[0].name);
      });

      WeatherAPI.getWeatherData(coordinates[0], coordinates[1], units).then(response => {
        setTemp(response.current.temp);
        setWeatherId(response.current.weather[0].id);
        setWeatherDesc(response.current.weather[0].description);
        setFeelsLike(response.current.feels_like);
        setHumidity(response.current.humidity);
        setWind(response.current.wind_speed);
        setSunrise(response.current.sunrise);
        setSunset(response.current.sunset);
        setWeatherHourly(response.hourly);
        setWeatherDaily(response.daily);
      });
    }
  }, [coordinates, setCoordinates, units, setUnits])

  return (
    <>
      <form method="#" action="#" className="options">
          <input type="text" placeholder="Search for a location" className="search" onChange={(e) => setTimeout(() => (e.target.value.length > 1) ? setLocationSearch(e.target.value) : '', 2000)} />
          <Button primary={ units === 'metric'} label="C" value="metric" onClick={(e) => setUnits(e.target.value)} /> 
          <Button primary={ units === 'imperial'} label="F"  value="imperial" onClick={(e) => setUnits(e.target.value)} />
      </form>

      <main>
        <WeatherConditions id={weatherId} location={location} temp={temp} weatherDesc={weatherDesc} />
        <WeatherDetails feelsLike={feelsLike} humidity={humidity} wind={wind} sunrise={sunrise} sunset={sunset} units={units} />
        <WeatherForecast hourly={weatherHourly} daily={weatherDaily} units={units} />
      </main>
    </>
  );
}

export default App;
