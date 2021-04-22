export default class WeatherAPI {
    
 static async getCoordinates(location) {
    return await fetch(`${process.env.REACT_APP_API_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_API_ID}`)
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    })
 }
}