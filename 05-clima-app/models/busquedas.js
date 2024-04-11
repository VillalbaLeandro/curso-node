const fs = require('fs')

const axios = require('axios');

const dbPath = './db/database.json'
class Busquedas {
    dbPath = './db/database.json'

    historial = [];
    constructor() {
       this.leerDB()
    }
    get historialCapitalizado(){
        const historialCapitalizado = this.historial.map(lugar => {
            return lugar.toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        });
        return historialCapitalizado;
    }
    
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    async ciudad(lugar = '') {

        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await intance.get()
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                texto: lugar.text_es,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            return [];
        }
    }
    get paramsWatherMap() {
        return {
            appid: process.env.OPENWHATER_KEY,
            lang: 'es',
            units: 'metric',
        }
    }
    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWatherMap, lat, lon }
            });;
            const resp = await instance.get()
            const { weather, main } = resp.data
            console.log(resp);

            return {
                temp: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max,
                humedad: main.humidity,
                desc: weather[0].description,
                icon: weather[0].icon,

            }

        } catch (error) {
            console.log('no se encontro el clima para este luggar')
            return []
        }
    }

    agregarHistorial(lugar = '') {
        //prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        }
        this.historial = this.historial.splice(0,5)
        this.historial.unshift(lugar.toLocaleLowerCase())


        this.guardarDB()
        this.leerDB()


    }


    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){
        if (!fs.existsSync(dbPath)) {
            return;
        }
        const info = fs.readFileSync(dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info)
        this.historial = data.historial
        return this.historial 
    }
}

module.exports = Busquedas;