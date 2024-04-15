const {response, request} = require('express')

const usuariosGet = (req , res = response) => {
    const {q, nombre = 'No name', apikey  } = req.query
    res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        apikey
    })
}
const usuariosPost = (req , res = response) => {
    const { nombre } = req.body
    res.json({
        msg: 'Post api - controlador',
        nombre
    })
}
const usuariosPut = (req , res = response) => {
    const id = req.params.id
    res.json({
        msg: 'get Put - controlador',
        id
    })
}
const usuariosPatch = (req , res = response) => {
    res.json({
        msg: 'get Path - controlador'
    })
}
const usuariosDelete = (req , res = response) => {
    res.json({
        msg: 'get Delete - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}