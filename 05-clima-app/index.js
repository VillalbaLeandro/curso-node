require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

console.clear();
const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        //imprimir el menu
        opt = await inquirerMenu();
        // console.log({ opt });    Imprimir la opcion que selecciono el usuario
        switch (opt) {
            case 1:
                //guardar la entrada del usuario
                const termino = await leerInput('Ingrese país, ciudad, lugar o dirección: ')
                //usar el termino para traer todos los lugares de la api en un array
                const lugares = await busquedas.ciudad(termino)
                //de todos los lugares extrae el id del lugar que seleccione el usuario
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                const lugarSeleccionado = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSeleccionado.nombre)

                const climaLugarSelec = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)

                // //muestra el id del lugar seleccionado
                // // console.log(lugarSeleccionado);

                //mostrar mensaje para que la persona escriba

                //Busdcar los lugars

                // Seleccionar el lugar

                // Clima

                //Mostrar resultados

                console.log('\nInformación del lugar: \n'.green.bold);
                console.log('🧭 - Lugar seleccionado: ', lugarSeleccionado.texto.yellow.bold, '\n');
                console.log('🌍 - Ciudad: ', lugarSeleccionado.nombre.yellow.bold, '\n');
                console.log('❔ - Como estará el cielo hoy?: ', climaLugarSelec.desc.yellow.bold, '\n');
                console.log('🌡️  - Temperatura: ', climaLugarSelec.temp.toString().yellow.bold, '°c \n'.yellow.bold);
                console.log('🥶 - Min: ', climaLugarSelec.tempMin.toString().yellow.bold, '°c\n'.bold.yellow.bold);
                console.log('🥵 - Max: ', climaLugarSelec.tempMax.toString().yellow.bold, '°c\n'.yellow.bold);
                console.log('💧 - Humedad: ', climaLugarSelec.humedad.toString().yellow.bold, '%\n'.yellow.bold);
                console.log('🌐 - Latitud: ', lugarSeleccionado.lat.toString().yellow.bold, '\n'.yellow.bold);
                console.log('🌐 - Longitud: ', lugarSeleccionado.lng.toString().yellow.bold, '\n'.yellow.bold);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = i + 1;
                    console.log(lugar);
                })
            default:
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt != 0);

    if (opt === 0) {
        console.clear();
        console.log(`${'\n\n-- Programa finalizado --'.bgRed}\n\n${'...Vuelva pronto! 👋'.green}\n`)
    };

}


main()