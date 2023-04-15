'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PagamentoAluguel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PagamentoAluguel.belongsTo(models.Locacao);
      models.Locacao.hasMany(PagamentoAluguel);
    }
  }
  PagamentoAluguel.init({
    valorPagamentoAluguel: DataTypes.DECIMAL,
    dataPagamentoAluguel: DataTypes.DATE,
    locacaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PagamentoAluguel',
  });
  return PagamentoAluguel;
};