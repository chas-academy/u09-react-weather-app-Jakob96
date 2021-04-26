import { Card } from 'grommet';
import './index.scss';

function WeatherDetails(props) {
  return (
    <Card className="card-details" width="large">
        <ul className="details">
            <li>Sunrise: { new Date(props.sunrise * 1000).toLocaleTimeString().substr(0, 5) }</li>
            <li>Sunset: { new Date(props.sunset * 1000).toLocaleTimeString().substr(0, 5) }</li>
            <li>Feels like { Math.round(props.feelsLike) }°</li>
            <li>Humidity { Math.round(props.humidity) }%</li>
            <li>Wind { Math.round(props.wind) } km/h</li>
        </ul>
    </Card>
  );
}

export default WeatherDetails;