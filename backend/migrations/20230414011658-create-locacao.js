'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataInicioLocacao: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "A data de inicio da locação é inválida"
          }
        }
      },
      dataFimLocacao: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "A data do fim da locação é inválida"
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
    await queryInterface.dropTable('Locacaos');
  }
};