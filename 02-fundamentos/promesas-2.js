const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Linda'
    },
    {
        id: 3,
        nombre: 'Karen'
    },
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
];

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        empleado
            ? resolve(empleado)
            : reject(`El empleado con el id: ${id} no existe`)
    })
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(e => e.id === id)?.salario
        salario
            ? resolve(salario)
            : reject(`El salario no se encuentra registrado para el cliente ID N°: ${id}`)
    })

}


const id = 3;
// PROMESAS EN CADENA 
let nombre;
getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log(`El empleado${nombre} tiene un salario de: ${salario}`))
    .catch(err => console.log(err))