import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Apartamento from "./apartamento.js";

const PedidoManutencao = db.define('MaintenanceRequest', {
    descricao_manutencao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_manutencao: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

Apartamento.hasMany(PedidoManutencao, {
    foreignKey: "apartamentoId"
});
PedidoManutencao.belongsTo(Apartamento, {
    foreignKey: "apartamentoId",
    onDelete: "CASCADE",
    constraint: true
});

export default PedidoManutencao