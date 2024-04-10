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
                console.log('usted selecciono la opcion', { opt });
                const termino = await leerInput('Ingrese cuidad: ')
                const lugares = await busquedas.ciudad(termino)
                const id = await listarLugares(lugares);
                console.log(id);

                //mostrar mensaje para que la persona escriba

                //Busdcar los lugars

                // Seleccionar el lugar

                // Clima

                //Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ',);
                console.log('Latitud: ',);
                console.log('lng: ',);
                console.log('Temperatura: ',);
                console.log('Min: ',);
                console.log('Max: ',);
                break;
            case 2:
                console.log('usted selecciono la opcion', { opt });

                break;
            case 3:
                console.log('usted selecciono la opcion', { opt });

                break;

            default:
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt != 0);

}


main()