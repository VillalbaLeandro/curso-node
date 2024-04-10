const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: "¿QUE DESEA HACER?".green,
        pageSize: 10,
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Editar tarea`
            },
            {
                value: '7',
                name: `${'7'.green}. Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            },
        ]
    }
]




const inquirerMenu = async () => {
    console.clear();
    console.log('====================================================='.green);
    console.log(`        ✨     ${'Seleccione una opción      ✨'.white}`);
    console.log('=====================================================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;
}

const pausa = async () => {
    const pause = [
        {
            type: 'input',
            name: 'opcion',
            message: `\n${'Presione'.white} ${'ENTER'.green} para continuar\n`.green,
        }
    ]
    console.log('\n');
    await inquirer.prompt(pause)
}

const leerInput = async (message) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return ' Por favor ingrese un valor'
                }
                return true
            },

        }

    ];
 
    const { desc } = await inquirer.prompt(question)
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc} `
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecione la tarea que desea borrar ⛔'.green,
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id

}
const listadoTareasEditar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc} `
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecione la tarea que desea Editar'.green,
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id

}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc} `,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: ' - Seleccione la(s) tarea(s) que desea completar - '.green,
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas)
    return ids

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
    listadoTareasEditar

}