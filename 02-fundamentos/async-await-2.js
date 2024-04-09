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
            : reject(`El empleado con el id ${id} no existe`)
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
const id = 4;

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id)
        const salario = await getSalario(id)
        return `Empleado: ${empleado}.\nSalario: ${salario}`
    } catch (error) {
        throw error
    }
}

getInfoUsuario(id)
    .then(msg => {
        console.log('TOdo bien');
        console.log(msg)
    })
    .catch( error => {
        console.log('Todo mal');
        console.log(error)
    })