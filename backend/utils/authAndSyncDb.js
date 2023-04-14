import dotenv from "dotenv/config.js";
import Sequelize from ("sequelize");
import db from ('../config/db.js');

const syncTable = async () => {
    try {
        await db.authenticate;
        console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
        await db.sync;
    } catch (error) {
        console.error(`Erro: `, error.message);
    }
}

export default syncTable;