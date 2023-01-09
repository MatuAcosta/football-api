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
      //one team --> many players
      Team.hasMany(models.Player,{
        foreignKey:'team_id'
      })
      //One country --> many teams
      Team.belongsTo(models.Country,{
        foreignKey:'country_id'
      })
      //one league --> many teams
      Team.belongsTo(models.League,{
        foreignKey:'league_id'
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
    logo: DataTypes.BLOB,
    league_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
    timestamps:false
  });
  return Team;
};