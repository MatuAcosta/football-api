'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Player,{
        foreignKey:'country_id'
      });
      Country.hasMany(models.Team,{
        foreignKey:'country_id'
      });
      Country.hasMany(models.League,{
        foreignKey:'country_id'
      })

    }
  }
  Country.init({
    name: DataTypes.STRING,
    flag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
    timestamps:false
  });
  return Country;
};