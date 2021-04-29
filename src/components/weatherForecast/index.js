import { Card } from 'grommet';
import './index.scss';

function WeatherForecast(props) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
  return (
    (props.daily.length) ?
    <>
      <section className="weatherForecast">
        { 
          props.hourly.slice(0, 25).map((element, index) =>
          <Card className="card-details" align="center" width="small" key={ element.dt }>
              <h3>{ (index === 0) ? 'Now' : new Date(element.dt * 1000).toLocaleTimeString().substr(0, 5) }</h3>
              <h2>{ Math.round(element.temp) + '°' }</h2>
              <i className={'wi wi-owm-' + element.weather[0].id}></i>
              <p>{ element.weather[0].description.charAt(0).toUpperCase() + element.weather[0].description.slice(1) }</p>
              <small>{ Math.round(element.feels_like) + '° | ' + Math.round(element.humidity) + '% | ' + Math.round(element.wind_speed) + (props.units === 'metric' ? ' km/h' : ' mph') }</small>
          </Card>
          ) 
        }
      </section>

      <Card className="card-details" width="large">
        <h3>Week overview</h3>
        <ul className="details">
            {
              props.daily.slice(1, 6).map(element =>
                <li key={ element.dt }>{ weekdays[new Date(element.dt * 1000).getDay()]} <span className="right">{ Math.round(element.temp.day) + '°' } | <i className={ 'wi small wi-owm-' + element.weather[0].id }></i></span></li>
              )
            }
        </ul>
      </Card>
    </>
    : ''
  );
}

export default WeatherForecast;