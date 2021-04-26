import { Card } from 'grommet';
import './index.scss';

function WeatherForecast(props) {
  return (
    <section className="weatherForecast">
       { 
        props.hourly.slice(0, 25).map(element =>
        <Card className="card-details" align="center" width="small">
            <h3>{ new Date(element.dt * 1000).toLocaleTimeString().substr(0, 5) }</h3>
            <h2>{ Math.round(element.temp) + '°' }</h2>
            <i className={'wi wi-owm-' + element.weather[0].id}></i>
            <p>{ element.weather[0].description.charAt(0).toUpperCase() + element.weather[0].description.slice(1) }</p>
            <small>{ Math.round(element.feels_like) + '° | ' + Math.round(element.humidity) + '% | ' + Math.round(element.wind_speed) + ' km/h' }</small>
        </Card>
        ) 
      }
    </section>
  );
}

export default WeatherForecast;