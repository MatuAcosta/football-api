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
      League.hasMany(models.Team,{
        foreignKey:'league_id'
      })
      League.belongsTo(models.Country,{
        foreignKey:'country_id'
      })
    }
  }
  League.init({
    name: DataTypes.STRING,
    logo: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'League',
    timestamps:false
  });
  return League;
};