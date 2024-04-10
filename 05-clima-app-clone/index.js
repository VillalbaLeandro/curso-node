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
                    console.log("Seleccione una opcion: ");
                    const termino = await leerInput("Ingrese un lugar: ")
                    const lugar = await busquedas.ciudad( termino )
                    const id = await listarLugares(lugar)
                    console.log(id);
            break;

            case 2:

                break;

            case 3:

                break;

            default:
                break;
        }

        if (opt !== 0) await pausa()
    } while (opt !== 0);

    console.log('hola muindo');
}


main();