const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: "¿SELECCIONE UNA OPCIÓN? \n".green,
        pageSize: 10,
        choices: [
            {
                value: 1,
                name: `  🔍  Buscar Ciudad\n`
            },
            {
                value: 2,
                name: `  📑  Historial\n`
            },
            {
                value: 0,
                name: `  ❌  Salir\n`
            }
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

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}`.green
        return {
            value: lugar.id,
            name: `➖ ${idx}. ${lugar.nombre} `
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
            message: 'Selecione una de las ubicacione: '.green,
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
    listarLugares,
    confirmar,
    mostrarListadoCheckList,
    listadoTareasEditar

}