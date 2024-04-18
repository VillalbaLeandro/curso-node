const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    usuarioGet } = require('../controllers/usuarios')

const { mailExiste, rolValido, existeUsuarioPorId } = require('../helpers/db-validators')

const { validarCampos } = require('../middlewares/validar-campos');
const { tieneRoles } = require('../middlewares/validar-roles');
const regex = require('../utils/regex');
const { validarJWT } = require('../middlewares/validar-jwt');
const rolUsuario = require('../utils/roles');

const router = Router()

//---------- ok
router.get('/', usuariosGet)

//----------  Busca usuario por nombre o correo  -// ok Params key: nombre o key: correo(completo)
router.get('/search', usuarioGet)

//---------Editar usuario  -// ok

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId()
        .custom((id) => existeUsuarioPorId(id)),
    check('rol')
        .custom((rol) => rolValido(rol)),
    validarCampos
], usuariosPut)


//---------- ok insertar nombre, correo, password y rol por body en postman
router.post('/', [
    //Validaciones - middlewares
    check('nombre', 'El nombre es requerido')
        .notEmpty()
        .isString()
        .withMessage('El nombre solo debe contener letras'),
    check('correo', 'El correo es requerido')
        .notEmpty()
        .isEmail()
        .withMessage('El mail ingresado no es valido')
        .custom((correo) => mailExiste(correo))
        .withMessage('El correo ya se encuentra registrado'),
    check('password', 'La constraseña es requerida')
        .notEmpty(),
    // .matches(regex.password)
    // .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y tener al menos 8 caracteres de longitud'),
    check('rol', 'El rol es requerido')
        .notEmpty()
        .custom((rol) => rolValido(rol)),
    validarCampos
],
    usuariosPost)

//---------- ok
router.patch('/', usuariosPatch)

//---------- ok
router.delete('/:id', [
    validarJWT,
    tieneRoles(rolUsuario.admin, rolUsuario.user),
    check('rol').custom((rol) => tieneRoles(rol)),
    validarCampos
],
    usuariosDelete)

//----------
router.put('/:id', usuariosPut)

module.exports = router; 