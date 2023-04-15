'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locatario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locatario.belongsTo(models.Apartamento);
      models.Apartamento.hasMany(Locatario);
    }
  }
  Locatario.init({
    nomeLocatario: DataTypes.STRING,
    emailLocatario: DataTypes.STRING,
    telefoneLocatario: DataTypes.STRING,
    apartamentoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Locatario',
  });
  return Locatario;
};