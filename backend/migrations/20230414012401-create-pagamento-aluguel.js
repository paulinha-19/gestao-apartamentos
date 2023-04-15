'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PagamentoAluguels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valorPagamentoAluguel: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Valor do pagamento do aluguel é inválido"
          }
        }
      },
      dataPagamentoAluguel: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "A data do pagamento do aluguel é inválida"
          }
        }
      },
      locacaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locacaos',
          key: 'id',
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
    await queryInterface.dropTable('PagamentoAluguels');
  }
};