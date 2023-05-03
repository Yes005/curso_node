const axios = require('axios')

class Busquedas {

    historial = ['Tegucigalpa','Madid','San Jose'];

    constructor(){

    }

    get paramsMapbox() {
        return {
            'proximity': 'ip',
            'language': 'es',
            'access_token' : process.env.MAPBOX_KEY,
        }
    }

    async ciudad( lugar = '' ){

        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }       

        
    }

    async climaLugar( lat, lon ){

        const params = {
            'lat' : lat,
            'lon' : lon,
            'appid' : process.env.OPENWEATHER_KEY,
            'units' : 'metric',
            'lang' : 'es'
        }

        try {         
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: params
            });

            const resp = await instance.get();
            
            return resp.data;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Busquedas;