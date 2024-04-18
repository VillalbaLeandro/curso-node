const mongoose = require('mongoose')

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Base de datos conectada con exito 👍🏼');
    } catch (error) {
        throw new Error('Error al conectar la bd')
    }
}

module.exports = {
    dbConection
}