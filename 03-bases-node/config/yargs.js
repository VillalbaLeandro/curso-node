const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true, //required
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'ingrese un numero hasta cuanto quiere mostrar la tabla'
    })
    .check((argv, option) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un numero'
        }
        if (isNaN(argv.h)) throw 'El numero limite debe ser de tipo numerico'
        return true;
    })
    .argv;

module.exports = argv;