import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Edificio = db.define('edificio', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "O nome do edificio não pode ser vazio"
            }
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O endereço do edificio não pode ser vazio"
            }
        }
    },
    qtd_andares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A quantidade de andar não pode ser vazia"
            },
            isInt: {
                msg: "A quantidade de andar tem que ser um numero inteiro"
            }
        }
    },
    qtd_apart_por_andar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A quantidade de apartamento por andar não pode ser vazio"
            },
            isInt: {
                msg: "A quantidade de apartamento por andar tem que ser um numero inteiro"
            }
        }
    },
});

export default Edificio