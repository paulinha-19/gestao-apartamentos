'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apartamento.belongsTo(models.Edificio);
      models.Edificio.hasMany(Apartamento);
    }
  }
  Apartamento.init({
    numeroApartamento: DataTypes.INTEGER,
    andarApartamento: DataTypes.INTEGER,
    disponivelApartamento: DataTypes.BOOLEAN,
    locadorApartamento: DataTypes.STRING,
    edificioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apartamento',
  });
  return Apartamento;
};