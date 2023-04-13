import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Locacao from "./locacao.js";

const PagamentoAluguel = db.define('RentalPayment', {
    valor_pagamento_aluguel: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data_pagamento_aluguel: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

Locacao.hasMany(PagamentoAluguel, {
    foreignKey: "locacaoId"
});
PagamentoAluguel.belongsTo(Locacao, {
    foreignKey: "locacaoId",
    onDelete: "CASCADE",
    constraint: true
});

export default PagamentoAluguel