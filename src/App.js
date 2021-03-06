import './App.scss';
import WeatherAPI from './WeatherAPI';
import { useEffect, useState } from 'react';
import WeatherConditions from './components/weatherConditions/index';
import WeatherDetails from './components/weatherDetails/index';
import WeatherForecast from './components/weatherForecast/index';
import SavedLocations from './components/savedLocations/index';
import WeatherData from './components/weatherData/index';
import { Location } from 'grommet-icons';
import { Button } from 'grommet';

function App() {
  const [units, setUnits] = useState(localStorage.getItem('units') || 'metric');
  const [location, setLocation] = useState(localStorage.getItem('location') || '');
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
  const [locationSaved, setLocationSaved] = useState(false);

  useEffect(() => {
    if (!location) {requestLocation(); }
  }, [location]);

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
        localStorage.setItem('location', response[0].name);
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

      localStorage.setItem('units', units);
      checkLocationSaved();

      function checkLocationSaved() {
        if (JSON.parse(localStorage.getItem('locations'))) {
          JSON.parse(localStorage.getItem('locations')).find(element => element[0] === coordinates[0] && element[1] === coordinates[1]) ? setLocationSaved(true) : setLocationSaved(false);
        }
      }
    }
  }, [coordinates, setCoordinates, units, setUnits, locationSaved, setLocationSaved]);

  function requestLocation() {
    navigator.geolocation.getCurrentPosition((pos) => { setCoordinates([pos.coords.latitude, pos.coords.longitude]); }, (err) => { console.error(err); setLocation('London')}); //If an error occurs, set London as default location
  };

  function saveLocation(coordinates, location) {
      let confirm = window.confirm("Do you want to save this location?");

      if (confirm) {
        let locations = JSON.parse(localStorage.getItem('locations')) || [];
        coordinates.push(location);
        locations.push(coordinates);
        localStorage.setItem('locations', JSON.stringify(locations));
        setLocationSaved(true);
      }
  };

  //Callback method called from SavedLocations component in onChange prop when user clicks a button with a new location
  function handleChangeLocation(location) {
    setLocation(location);
  }

  return (
    <>
      <form method="#" action="#" className="options">
          <input type="text" placeholder="Search for a location" className="search" onChange={(e) => setTimeout(() => (e.target.value.length > 1) ? setLocationSearch(e.target.value) : '', 2000)} />
          { (navigator.geolocation) ?  <Button primary className="btn-location" onClick={() => requestLocation()}><Location color="white" /></Button> : ''}
          <Button primary={ units === 'metric'} label="C" value="metric" onClick={(e) => setUnits(e.target.value)} /> 
          <Button primary={ units === 'imperial'} label="F"  value="imperial" onClick={(e) => setUnits(e.target.value)} />
          { (!locationSaved) ? <Button secondary onClick={() => saveLocation(coordinates, location)} label="Save" /> : '' }
      </form>

      <main>
        <WeatherConditions id={weatherId} location={location} temp={temp} weatherDesc={weatherDesc} />
        <WeatherDetails feelsLike={feelsLike} humidity={humidity} wind={wind} sunrise={sunrise} sunset={sunset} units={units} />
        <WeatherForecast hourly={weatherHourly} daily={weatherDaily} units={units} />
        <SavedLocations onChange={handleChangeLocation} />
        <WeatherData data={weatherDaily} />
      </main>
      <footer>
        <small>&copy; {new Date().getFullYear() + ' Jakob Jyberg | Weather data from '}<a href="https://openweathermap.org" target="_blank" rel="noreferrer">OpenWeatherMap</a></small>
      </footer>
    </>
  );
}

export default App;
