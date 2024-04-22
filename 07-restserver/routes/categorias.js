const { Router } = require('express');
const { check } = require('express-validator');



const { validarCampos, validarJWT } = require('../middlewares');
const { categoriasGet } = require('../controllers/categorias');

const router = Router();

//obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get');
})


// obtener una categoria por id - publico 
router.get('/:id', (req, res) => {
    res.json('get -id');
})


// Crear una nueva categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    validarCampos], (req, res) => {
        res.json('post');
    })


// Atualizar un registro por id - privado - cualquiera con un token valido
router.put('/:id', (req, res) => {
    res.json('put');
})

// delete o borrar una categoria - privado - admin
router.delete('/:id', (req, res) => {
    res.json('delete');
})



module.exports = router;