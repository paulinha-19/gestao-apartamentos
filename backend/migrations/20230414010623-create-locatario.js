'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locatarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeLocatario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O nome do locatário não pode ser vazio"
          }
        }
      },
      emailLocatario: {
        type: Sequelize.STRING,
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
      telefoneLocatario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O telefone do locatário não pode ser vazio"
          },
          isInt: {
            msg: "O telefone deve possuir apenas números inteiros"
          }
        }
      },
      apartamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Apartamentos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Locatarios');
  }
};