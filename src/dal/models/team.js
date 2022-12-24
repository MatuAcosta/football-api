'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Player,{
        foreignKey:'team_id'
      })
      Team.belongsTo(models.Country,{
        foreignKey:'country_id'
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
    league: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Team',
    timestamps:false
  });
  return Team;
};