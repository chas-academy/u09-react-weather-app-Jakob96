export default class WeatherAPI {
    
 static async getCoordinates(location) {
    return await fetch(`${process.env.REACT_APP_API_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_API_ID}`)
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    })
 }

 static async getWeatherData(lat, lon, units) {
    const query = `lat=${lat}&lon=${lon}`

    return await fetch(`${process.env.REACT_APP_API_URL}/data/2.5/onecall?${query}&units=${units}&APPID=${process.env.REACT_APP_API_ID}&lang=${(navigator.language) ? navigator.language.substr(0, 2) : 'en'}`)
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    });
 };

}