import { Card, DataChart } from 'grommet';
import './index.scss';

function WeatherData(props) {
    const highestTemps = [];
    const lowestTemps = [];

    props.data.slice(0, 8).map(element => {
        highestTemps.push({ date: new Date(element.dt * 1000).toLocaleDateString(), degrees: element.temp.max});
        lowestTemps.push({ date: new Date(element.dt * 1000).toLocaleDateString(), degrees: element.temp.min});
    });

  return (
    (props.data) ?
    <>
      <Card className="card-details" width="large">
        <h3>Highest temperatures</h3>
        <DataChart
            data={highestTemps}
            series={['date', 'degrees']}
            chart={[
                { property: 'degrees', type: 'line', opacity: 'medium', thickness: 'xsmall' },
                { property: 'degrees', type: 'point', point: 'circle', thickness: 'small' }
            ]}
        />
      </Card>

    <Card className="card-details" width="large">
        <h3>Lowest temperatures</h3>
        <DataChart
            data={lowestTemps}
            series={['date', 'degrees']}
            chart={[
                { property: 'degrees', type: 'line', opacity: 'medium', thickness: 'xsmall' },
                { property: 'degrees', type: 'point', point: 'circle', thickness: 'small' }
        ]}
        />
    </Card>
    </>
    : ''
  );
}

export default WeatherData;