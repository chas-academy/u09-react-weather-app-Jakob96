import { Card } from 'grommet';
import './index.scss';

function SavedLocations(props) {
  return (
      <Card className="card-details" width="large">
          <h3>Saved locations</h3>
          <ul className="details">
              {
                  (JSON.parse(localStorage.getItem('locations')) ? 
                  JSON.parse(localStorage.getItem('locations')).map((element, index) => {
                   return <li key={index}><a href="#" onClick={() => props.onChange(element[2])}>{ element[2] }</a></li>
                }) 
                : 'You have no saved locations yet.')           
              }
          </ul>
      </Card>
  );
}

export default SavedLocations;