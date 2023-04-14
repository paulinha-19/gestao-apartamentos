'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Edificios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeEdificio: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "O nome do edificio não pode ser vazio"
          }
        }
      },
      enderecoEdificio: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O endereço do edificio não pode ser vazio"
          }
        }
      },
      qtdAndarEdificio: {
        type: Sequelize.INTEGER,
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
      qtdApartPorAndar: {
        type: Sequelize.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Edificios');
  }
};