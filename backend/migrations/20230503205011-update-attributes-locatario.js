'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Locatarios', 'emailLocatario', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email inválido",
        },
        notEmpty: {
          msg: "O email do locatário não pode ser vazio"
        }
      }
    });

    await queryInterface.changeColumn('Locatarios', 'telefoneLocatario', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "O telefone do locatário não pode ser vazio"
        },
        isInt: {
          msg: "O telefone deve possuir apenas números inteiros"
        }
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Locatarios', 'emailLocatario');
    await queryInterface.changeColumn('Locatarios', 'telefoneLocatario');
  }
};
