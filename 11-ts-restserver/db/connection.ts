import { Sequelize } from 'sequelize';

const db = new Sequelize('node-sql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;