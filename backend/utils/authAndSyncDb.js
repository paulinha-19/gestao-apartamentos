require("dotenv").config();
const sequelize = require('../config/db');

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
        await sequelize.sync();
    } catch (error) {
        console.error(`Erro: `, error.message);
    }
})()