import { Card, Button } from 'grommet';
import './index.scss';

function SavedLocations(props) {
  return (
      <Card className="card-details" width="large">
          <h3>Saved locations {(JSON.parse(localStorage.getItem('locations')) ? <Button primary className="right" label="Remove items" onClick={() => { localStorage.removeItem('locations'); window.location.reload(); }} /> : '')}</h3>

          <ul className="horizontal-list">
              {
                  (JSON.parse(localStorage.getItem('locations')) ? 
                  JSON.parse(localStorage.getItem('locations')).map((element, index) => {
                   return <li key={index}><Button secondary onClick={() => { props.onChange(element[2]); window.scrollTo({top: 0, behavior: 'smooth'}); }} label={element[2]} /></li>
                }) 
                : <p className="center">You have no saved locations yet.</p>)           
              }
          </ul>
      </Card>
  );
}

export default SavedLocations;