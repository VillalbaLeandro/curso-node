const {Schema, model} = require('mongoose')
//asegurarse de que los roles esten cargados en la bd
const RolSchema = Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

module.exports = model('Role', RolSchema)