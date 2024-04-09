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

    listadoCompleto() {
        console.log("");

        console.log('  """""""""lISTADO DE TAREAS""""""""""  \n'.bgBlue.bold);
        //formas de hacerlo directamente desde el objeto

        // const nuevoListado = Object.values(this._listado).map((tarea, key) => {
        //     console.log(`${`${key+1}`.green}${'.'.green} ${tarea.desc} ${tarea.completadoEn ? ' Completada '.bgGreen.white : ' Pendiente '.red}   `);

        // })

        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const desc = tarea.desc
            const estado = tarea.completadoEn ? ' Completada '.bgGreen.white : ' Pendiente '.red;


            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendiendtesCompletadas(completadas = true) {
        // const filtradas = this.listadoArr.filter(tarea => {
        //     return completadas ? tarea.completadoEn !== null : tarea.completadoEn === null;
        // });

        // console.log("");

        // const titulo = completadas ? 'Tareas Completadas' : 'Tareas Pendientes';
        // console.log(`  "${titulo}" \n`.bgBlue.bold);

        // filtradas.forEach((tarea, index) => {
        //     const idx = `${index + 1}.`.green;
        //     const desc = tarea.desc;
        //     const estado = tarea.completadoEn ? ' Completada '.bgGreen.white : ' Pendiente '.red;
        //     console.log(`${idx} ${desc} :: ${estado}`);
        // });


        console.log('  """""""""lISTADO DE TAREAS""""""""""  \n'.bgBlue.bold);
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea
            const estado = tarea.completadoEn ? ' Completada '.bgGreen.white : ' Pendiente '.red;
            if (completadas) {
                if (tarea.completadoEn) {
                    contador += 1
                    console.log(`${contador + '.'.green} ${desc} :: ${completadoEn.green}`);
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