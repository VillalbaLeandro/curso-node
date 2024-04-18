const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    correo: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    password: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    img:{
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...usuarios} = this.toObject();
    usuarios.uid = _id;
    return usuarios;
}

module.exports = model('Usuario', UsuarioSchema);