import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Edificio from "./edificio.js";

const Apartamento = db.define('apartamento', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    andar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    locador: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Biopark"
    }
});

// Apartamento.belongsTo(Edificio, { constraint: true, foreignKey: "edificioId", onDelete: "cascade" });
// Edificio.hasMany(Apartamento, { foreignKey: 'edificioId' });
// Locacao.belongsTo(Apartamento, { constraint: true, foreignKey: 'apartamentoId', onDelete: "cascade" });
// Apartamento.hasMany(Locacao, { foreignKey: 'apartamentoId' });

Edificio.hasMany(Apartamento, {
    foreignKey: "edificioId",
});
Apartamento.belongsTo(Edificio, {
    foreignKey: "edificioId",
    onDelete: "CASCADE",
    constraint: true,
});


export default Apartamento