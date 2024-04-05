const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');


console.clear();
console.log('base: yarg', argv.b, 'listar:', argv.l, 'Limite: ', argv.h);


crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creada'.bgGreen))
    .catch(err => console.log(err)) 