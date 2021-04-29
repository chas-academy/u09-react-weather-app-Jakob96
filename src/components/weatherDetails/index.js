import { Card } from 'grommet';
import './index.scss';

function WeatherDetails(props) {
  return (
    (props.sunrise) ?
      <Card className="card-details" width="large">
          <ul className="details">
              <li><i className="wi small wi-sunrise"></i> Sunrise<span className="right">{ new Date(props.sunrise * 1000).toLocaleTimeString().substr(0, 5) }</span></li>
              <li><i className="wi small wi-sunset"></i> Sunset<span className="right">{ new Date(props.sunset * 1000).toLocaleTimeString().substr(0, 5) }</span></li>
              <li><i className="wi small wi-thermometer"></i> Feels like<span className="right">{ Math.round(props.feelsLike) }°</span></li>
              <li><i className="wi small wi-humidity"></i> Humidity <span className="right">{ Math.round(props.humidity) }%</span></li>
              <li><i className="wi small wi-strong-wind"></i> Wind <span className="right">{ Math.round(props.wind) + (props.units === 'metric' ? ' km/h' : ' mph') }</span></li>
          </ul>
      </Card>
    : ''
  );
}

export default WeatherDetails;