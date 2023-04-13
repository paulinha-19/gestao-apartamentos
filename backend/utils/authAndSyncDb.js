import db from '../config/db.js';
import dotenv from "dotenv/config.js";

const syncTable = async () => {
    try {
        await db.authenticate();
        console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
        await db.sync();
    } catch (error) {
        console.error(`Erro: `, error.message);
    }
}

export default syncTable;