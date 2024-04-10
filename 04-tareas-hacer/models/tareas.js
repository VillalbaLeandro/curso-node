const Tarea = require('./tarea')

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        })
        return listado
    }

    constructor() {
        this._listado = {};
    }
    borrarTareas(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    async editarTareas(id) {
        if (this._listado[id]) {
            const nuevaDescripcion = await leerInput('Ingrese la nueva descripción para la tarea:');
            this._listado[id].desc = nuevaDescripcion;
            console.log('Tarea editada correctamente.');
        } else {
            console.log('La tarea especificada no existe.');
        }
    }
    listadoCompleto() {
        console.log("");

        console.log('\n  """""""""lISTADO DE TAREAS""""""""""  \n'.bgBlue.bold);

        let maxLength = 0; // variable para almacenar la longitud máxima de la descripción

        this.listadoArr.forEach(tarea => {
            if (tarea.desc.length > maxLength) {
                maxLength = tarea.desc.length; // actualiza la longitud máxima si se encuentra una descripción más larga
            }
        });

        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const desc = tarea.desc.padEnd(maxLength); // ajusta la longitud de la descripción para que todas tengan el mismo tamaño
            const estado = tarea.completadoEn ? ' ✅ Completada '.green : ' 🕗 Pendiente '.red;

            console.log(`${idx} ${desc} | Estado: ${estado}`);
        });
    }

    listarPendiendtesCompletadas(completadas = true) {
        
        let maxLength = 0; // variable para almacenar la longitud máxima de la descripción

        this.listadoArr.forEach(tarea => {
            if (tarea.desc.length > maxLength) {
                maxLength = tarea.desc.length; // actualiza la longitud máxima si se encuentra una descripción más larga
            }
        });
        if (completadas) {
            console.log('\n         """" lISTADO DE TAREAS COMPLETAS """"  \n'.green.bold);

        } else {
                console.log('\n      """" lISTADO DE TAREAS PENDIENTES """"  \n'.red.bold);
        }
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            let { desc, completadoEn } = tarea
            desc = tarea.desc.padEnd(maxLength);
            const estado = tarea.completadoEn ? ' Completada '.green : '🕗 Pendiente '.red;
            if (completadas) {
                if (tarea.completadoEn) {
                    contador += 1
                    console.log(` ${contador + '.'.green} ${desc} :: ✅ ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${contador + '.'.green} ${desc} :: ${estado}`);
                }
            }

        });


    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;