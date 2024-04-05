const { crearArchivo } = require('./helpers/multiplicar');
const argv  = require('./config/yargs')

console.clear();
console.log('base: yarg', argv.b, 'listar:', argv.l);


crearArchivo(argv.b, argv.l)
    .then(data => console.log(data, 'creado'))
    .catch(err => console.log(err)) 