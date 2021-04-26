import './App.scss';
import WeatherAPI from './WeatherAPI';
import { useEffect, useState } from 'react';
import WeatherConditions from './components/weatherConditions/index';
import WeatherDetails from './components/weatherDetails/index';
import WeatherForecast from './components/weatherForecast/index';

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
    <main>
      <WeatherConditions id={weatherId} location={location} temp={temp} weatherDesc={weatherDesc} />
      <WeatherDetails feelsLike={feelsLike} humidity={humidity} wind={wind} sunrise={sunrise} sunset={sunset} />
      <WeatherForecast hourly={weatherHourly} daily={weatherDaily} />
    </main>
  );
}

export default App;
