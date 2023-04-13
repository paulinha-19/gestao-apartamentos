import { DataTypes } from "sequelize";
import db from "../config/db.js"
import Apartamento from "./apartamento.js";

const Locatario = db.define('locatario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O nome do locatario não pode ser vazio"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email inválido",
            },
            notEmpty: {
                msg: "O email do locatário não pode ser vazio"
            }
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O email do locatário não pode ser vazio"
            }
        }
    },
});

Apartamento.hasMany(Locatario,{
    foreignKey: 'apartamentoId',
});
Locatario.belongsTo(Apartamento,{
    foreignKey: 'apartamentoId',
    onDelete: "CASCADE",
    constraint: true,
});
// Locacao.belongsTo(Locatario, { constraints: true, foreignKey: 'locatarioId', onDelete: 'cascade' });
// Locatario.hasMany(Locacao, { foreignKey: 'locatarioId' });
export default Locatario