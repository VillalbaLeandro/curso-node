const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const usuarios = await Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    res.json({
        usuarios
    })
}

// Buscar usuario por nombre o correo :
const usuarioGet = async (req, res) => {
    const { nombre, correo } = req.query;
    const usuario = await Usuario.findOne({ $or: [{ correo }, { nombre }] })
    res.json(usuario)
}
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body

    const usuario = new Usuario({ nombre, correo, password, rol })
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();
    res.json({
        usuario,
        msg: 'usuario creado'
    })
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body

    if (!id) {
        return res.status(401).json({
            msg: 'El id no existe'
        })
    }
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)

}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'get Path - controlador'
    })
}
const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario,
        msg: 'Usuario deshabiliado con éxito'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete,
    usuarioGet
}