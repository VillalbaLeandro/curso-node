const fs = require('fs');
const { resolve } = require('path');

const crearArchivo = async (base = 5, list) => {
    try {
        let salida = '';
        for (let i = 1; i < 11; i++) {
            salida += ` ${base} x ${i} = ${base * i}\n`;
        }
        if (list) {
            console.log('===========================');
            console.log(`        TABLA DEL: ${base}`);
            console.log('===========================');
            console.log(salida);
        }
        fs.writeFile(`tabla-${base}.txt`, salida, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(`tabla-${base}.txt creado`);
            }
        });
    } catch (error) {
        throw (error);
    }
};

module.exports = {
    crearArchivo
};
