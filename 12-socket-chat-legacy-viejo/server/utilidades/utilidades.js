const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fetch: new Date().getTime()
    }

}

module.exports = crearMensaje;

