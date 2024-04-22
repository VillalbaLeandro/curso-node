const { response } = require("express")
const {Cateogira} = require('../models')



const crearCategoria = async (req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await findOne({nombre})

    res.json({
        msg: 'Hola categorias'
    })
}


module.exports = {
    crearCategoria
}