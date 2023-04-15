'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locacao.belongsTo(models.Apartamento);
      models.Apartamento.hasMany(Locacao);
    }
  }
  Locacao.init({
    dataInicioLocacao: DataTypes.DATE,
    dataFimLocacao: DataTypes.DATE,
    apartamentoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Locacao',
  });
  return Locacao;
};