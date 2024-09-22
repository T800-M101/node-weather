require('dotenv').config();
const axios = require('axios');

class AxiosInstance {
    constructor(){
        this.token = process.env.MAPBOX_TOKEN;
        this.weatherKey=process.env.OPENWEATHER_KEY;
        this.instance = axios.create({
            baseURL: 'https://api.mapbox.com/search/geocode/v6/forward',
            params: {
                language: 'en',
                access_token: this.token,
            }
        });
    }

    getCity(place) {
       return this.instance.get('',{
            params: { q:place }
       });
    }

    getWeatherByPlace(lat, lng) {
        return this.instance.get('', {
            baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.weatherKey}`
        });
    }
} 

module.exports = AxiosInstance;