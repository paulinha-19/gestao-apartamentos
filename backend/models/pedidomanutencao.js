'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoManutencao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PedidoManutencao.belongsTo(models.Apartamento);
      models.Apartamento.hasMany(PedidoManutencao);
    }
  }
  PedidoManutencao.init({
    descricaoManutencao: DataTypes.STRING,
    dataManutencao: DataTypes.DATE,
    apartamentoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PedidoManutencao',
  });
  return PedidoManutencao;
};