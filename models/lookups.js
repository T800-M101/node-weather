const fs = require('fs');
const AxiosInstance = require("../axios/axios");

class Lookups {
    _record = [];

    dbPath = './db/database.json';
    
    constructor(){
        this.axios = new AxiosInstance();
        this.readDB();
    }

    get capitalizeHistory() {
        this._record = this._record.map( record  => {
            return record.split(' ')
                  .map( word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
        });
        return this._record;
    }

    async city(place = '') {
        
        try {
            const response = await this.axios.getCity(place);
        
            return response.data.features.map( place => ({
                    id: place.id,
                    name: place.properties.full_address,
                    lng: place.geometry.coordinates[0],
                    lat: place.geometry.coordinates[1]
                }));
  
        } catch (error) {
            return [];
        }
        
    }

    async weatherByPlace(lat, lng) {

        try {
            const response = await this.axios.getWeatherByPlace(lat, lng);
            return {
                desc: response.data.weather[0].description,
                min: response.data.main.temp_min,
                max: response.data.main.temp_max,
                temp: response.data.main.temp,
            }
            
        } catch (error) {
            return [];
        }
    }

    history(place) {
        if ( this._record.includes(place.toLowerCase()) ) {
            return;
        }
        this._record.unshift(place.toLowerCase());
        
        if (this._record.length > 6 ) {
            this._record = this._record.splice(0,5);
        }

        this.saveDB();
    }

    saveDB() {
        const paylaod = {
            history: this._record
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(paylaod));
    }

    readDB() {
        if ( !fs.existsSync(this.dbPath) ) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'} );
        const data = JSON.parse(info);
        this._record = data.history;
    }
}

module.exports = Lookups;