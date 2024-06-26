require('colors');
const {
    guardarDB,
    leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
    listadoTareasEditar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        //imprimir el menu
        opt = await inquirerMenu();
        // console.log({ opt });    Imprimir la opcion que selecciono el usuario

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
                break;
            case '3':
                tareas.listarPendiendtesCompletadas(true)
                break;
            case '4':
                tareas.listarPendiendtesCompletadas(false)
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const idEdit = await listadoTareasEditar(tareas.listadoArr);
                if (idEdit !== 0) {
                    const tareaSeleccionada = tareas.listadoArr.find(tarea => tarea.id === idEdit);
                    console.log(`Tarea actual: ${tareaSeleccionada.desc}`);
                    const nuevaDescripcion = await leerInput('Ingrese la nueva descripción para la tarea:');
                    const ok = await confirmar('¿Estás seguro de editar esta tarea?');
                    if (ok) {
                        tareaSeleccionada.desc = nuevaDescripcion;
                        guardarDB(tareas.listadoArr);
                        console.log("Tarea editada correctamente.");
                    } else {
                        console.log("Edición de tarea cancelada.");
                    }
                }
                break;
            case '7':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== 0) {
                    const ok = await confirmar('Estas seguro?')
                    if (ok) {
                        tareas.borrarTareas(id);
                        console.log("tarea borrada ✅")
                    };
                }
                break;
        }

        guardarDB(tareas.listadoArr)
        await pausa();
    } while (opt !== '0');
};

main()

