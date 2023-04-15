'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PedidoManutencaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricaoManutencao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataManutencao: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "A data da manutenção é inválida. Insira uma data válida."
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
    await queryInterface.dropTable('PedidoManutencaos');
  }
};