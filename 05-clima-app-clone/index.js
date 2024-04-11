require('dotenv').config()
const { inquirerMenu, leerInput, listarLugares, pausa } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas.js');
console.clear();
const main = async () => {
    const busquedas = new Busquedas()
    let opt;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                    const termino = await leerInput("Ingrese un lugar: ")
                    const lugares = await busquedas.ciudad( termino )
                    const id = await listarLugares(lugares)
                    if (id === 0) continue;
                    const lugarSeleccionado = lugares.find(lugar => lugar.id === id)
                    const climaLugarSelec = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)

                    busquedas.agregarHistorial(lugarSeleccionado.nombre)

                    console.log('Temperatura ', climaLugarSelec.temp);
                    console.log('Temperatura min ', climaLugarSelec.tempMin);
                    console.log('Temperatura Maz', climaLugarSelec.tempMax);
                    console.log('descripcion ', climaLugarSelec.desc);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) =>{
                    const idx = i + 1;
                    console.log(idx, lugar);
                })
                break;

            case 3:

                break;

            default:
                break;
        }

        if (opt !== 0) await pausa()
    } while (opt !== 0);

    console.log('Programa finalizado');
}


main();