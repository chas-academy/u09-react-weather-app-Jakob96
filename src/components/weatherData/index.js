import { Card, DataChart } from 'grommet';
import './index.scss';

function WeatherData(props) {
    const highestTemps = [];
    const lowestTemps = [];

    props.data.slice(0, 8).forEach(element => {
        highestTemps.push({ date: new Date(element.dt * 1000).toLocaleDateString(), degrees: element.temp.max});
        lowestTemps.push({ date: new Date(element.dt * 1000).toLocaleDateString(), degrees: element.temp.min});
    });

  return (
    (props.data.length) ?
    <>
      <Card className="card-details" width="large">
        <h3>Highest temperatures</h3>
        <DataChart
          data={highestTemps}
          series={['date', 'degrees']}
          chart={[
              { property: 'degrees', type: 'line', opacity: 'medium', thickness: 'xsmall', color: 'brand' },
              { property: 'degrees', type: 'point', point: 'circle', thickness: 'small', color: 'brand' }
          ]}
        />
      </Card>

    <Card className="card-details" width="large">
        <h3>Lowest temperatures</h3>
        <DataChart
          data={lowestTemps}
          series={['date', 'degrees']}
          chart={[
              { property: 'degrees', type: 'line', opacity: 'medium', thickness: 'xsmall', color: 'brand' },
              { property: 'degrees', type: 'point', point: 'circle', thickness: 'small', color: 'brand' }
          ]}
        />
    </Card>
    </>
    : ''
  );
}

export default WeatherData;