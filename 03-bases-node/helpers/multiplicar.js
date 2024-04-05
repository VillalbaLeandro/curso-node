const fs = require('fs');
const { resolve } = require('path');
const colors = require('colors');
const crearArchivo = async (base = 5, list, hasta = 10) => {
    try {
        let salida = '';
        let consola = '';
        for (let i = 1; i <= hasta; i++) {
            salida += ` ${base} x ${i} = ${base * i}\n`;
            consola += ` ${colors.blue(base)} ${'x'.red} ${i} = ${base * i}\n`;
        }
        if (list) {
            console.log('==========================='.bgCyan);
            console.log(`       TABLA DEL: ${base}       `.red.bgWhite);
            console.log('==========================='.bgCyan);
            console.log(`${consola}`.white);
        }
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;
    } catch (error) {
        throw (error);
    }
};

module.exports = {
    crearArchivo
};
