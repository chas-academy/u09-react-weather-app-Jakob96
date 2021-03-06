import { Card, Spinner } from 'grommet';
import './index.scss';

function WeatherConditions(props) {
  return (
    <Card className="card" align="center" width="large">
     { (props.id) ? 
      <>
        <h2>{ props.location}</h2>
        <h1 aria-label={'Current temperature in ' + props.location}>{ Math.round(props.temp) + '°'}</h1>
        <i className={'wi wi-owm-' + props.id}></i>
        <p>{ props.weatherDesc.charAt(0).toUpperCase() + props.weatherDesc.slice(1) }</p>
      </>
      : <Spinner size="large" /> }
    </Card>
  );
}

export default WeatherConditions;