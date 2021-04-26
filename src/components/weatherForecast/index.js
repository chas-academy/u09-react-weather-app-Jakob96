import { Card } from 'grommet';
import './index.scss';

function WeatherForecast(props) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
    <section className="weatherForecast">
       { 
        props.hourly.slice(0, 25).map(element =>
        <Card className="card-details" align="center" width="small" key={ element.dt }>
            <h3>{ new Date(element.dt * 1000).toLocaleTimeString().substr(0, 5) }</h3>
            <h2>{ Math.round(element.temp) + '°' }</h2>
            <i className={'wi wi-owm-' + element.weather[0].id}></i>
            <p>{ element.weather[0].description.charAt(0).toUpperCase() + element.weather[0].description.slice(1) }</p>
            <small>{ Math.round(element.feels_like) + '° | ' + Math.round(element.humidity) + '% | ' + Math.round(element.wind_speed) + (props.units === 'metric' ? ' km/h' : ' mph') }</small>
        </Card>
        ) 
      }
    </section>

    <Card className="card-details" width="large">
    <ul className="details">
        {
          props.daily.slice(0, 7).map((element, index) =>
            <li key={ element.dt }>{ weekdays[index] } { Math.round(element.temp.day) + '°' } | <i className={ 'wi wi-owm-' + element.weather[0].id }></i></li>
          )
        }
    </ul>
    </Card>
</>
  );
}

export default WeatherForecast;