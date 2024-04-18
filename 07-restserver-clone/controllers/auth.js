const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')
const { password } = require('../utils/regex')

const login = async(req, res = response) => {
    const { _id, ...resto} = req.body
    const {correo, password} = resto
    
    try {
        
        
        // Verificar si el usuario existe,  si no un 400
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no esta registrado en el sistema'
            })
        }
        
        
        // El usuario esta activo? 
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra deshabilitado'
            })
        }
        
        
        
        // Verificar contraseña 
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/password incorrecto'
            })
        }
        // Generar JWT 
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        
    }
    
}
    
    module.exports = {
        login
    }