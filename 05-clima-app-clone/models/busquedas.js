const fs = require('fs')
const axios = require('axios')
const { REFUSED } = require('dns')


class Busquedas {
    dbPath = './db/historialDB.json'
    historial = []
    constructor() {
        this.leerDB()
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    get historialCapitalizado() {
        const historialCapitalizado = this.historial.map(lugar => {
            return lugar.toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        });
        return historialCapitalizado;
    }

    async ciudad(lugar = '') {

        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await intance.get()
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
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
            units: 'metric',
            lang: 'es'
        }
    }
    async climaLugar(lat, lon) {

        try {
            const instacia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWatherMap, lat, lon }
            })

            const resp = await instacia.get()
            const { weather, main } = resp.data
            return {
                temp: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max,
                desc: weather[0].description
            }


        } catch (error) {
            return []
        }

    }

    agregarHistorial(lugar = '') {
        //prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        }
        this.historial = this.historial.splice(0, 5)
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

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        }
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info)
        this.historial = data.historial
        return this.historial
    }
}



module.exports = Busquedas;