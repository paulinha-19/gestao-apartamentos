'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apartamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroApartamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "O número do apartamento deve ser um inteiro"
          }
        }
      },
      andarApartamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "O andar do apartamento deve ser um inteiro"
          }
        }
      },
      disponivelApartamento: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      locadorApartamento: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Biopark"
      },
      edificioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Edificios',
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
    await queryInterface.dropTable('Apartamentos');
  }
};