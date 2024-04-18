const Usuario = require("../models/usuario")
const Rol = require("../models/rol")
const mailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const rolValido = async (rol) => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es un rol válido`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeId = await Usuario.findById(id)
    if (!existeId) {
        throw new Error(`El id no existe`)
    }
}
module.exports = {
    mailExiste,
    rolValido,
    existeUsuarioPorId
}