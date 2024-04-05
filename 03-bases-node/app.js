const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true, //required
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false
    })
    .check((argv, option) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un numero'
        }
        return true;
    })
    .argv;
console.clear();
console.log('base: yarg', argv.b, 'listar:', argv.l);


crearArchivo(argv.b, argv.l)
    .then(data => console.log(data, 'creado'))
    .catch(err => console.log(err)) 