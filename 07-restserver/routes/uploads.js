const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivos, mostrarImagenes, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivos)
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion')
        .custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen)

router.get('/:coleccion/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion')
        .custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagenes)

module.exports = router;
