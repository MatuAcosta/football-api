'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      League.hasMany('Teams',{
        foreignKey:'league_id'
      })
      League.belongsTo('Country',{
        foreignKey:'country_id'
      })
    }
  }
  League.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'League',
  });
  return League;
};