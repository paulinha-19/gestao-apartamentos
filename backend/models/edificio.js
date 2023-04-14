'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Edificio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Edificio.init({
    nomeEdificio: DataTypes.STRING,
    enderecoEdificio: DataTypes.STRING,
    qtdAndarEdificio: DataTypes.INTEGER,
    qtdApartPorAndar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Edificio',
  });
  return Edificio;
};