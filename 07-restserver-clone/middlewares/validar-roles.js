const rol = require("../models/rol")
const rolUsuario = require("../utils/roles")

const rolAdmin = (req, res, next) => {
    const usuario = req.usuario

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token primero'
        })
    }
    const { rol, nombre } = req.usuario
    if (rol !== rolUsuario.admin){
        return res.status(401).json({
            msg: "Necesita permisos de administrador para realizar esta acción"
        })
    }
    next();
}

const tieneRoles = ( ...roles) =>{
    return( req, res, next)=>{
        console.log(roles);
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin verificar el token primero'
            })
        }
        if(!roles.includes(req.usuario.rol))({
            msg: 'Su rol de usuario no le permite realizar esta acción'
        })
        next();
    }
}

module.exports = {
    rolAdmin,
    tieneRoles
}