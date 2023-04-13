import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Apartamento from "./apartamento.js";

const Locacao = db.define('locacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_inicio_locacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim_locacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

Apartamento.hasMany(Locacao, {
    foreignKey: 'apartamentoId',
});
Locacao.belongsTo(Apartamento, {
    foreignKey: 'apartamentoId',
    onDelete: "CASCADE",
    constraint: true,
});

export default Locacao