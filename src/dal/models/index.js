'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/index.js')[env];
const db = {};
const sequelize = new Sequelize('postgres://matias:KIkEhHgp2M2pP4CZXAfiMkIsfcc6iM1X@dpg-ceuu5pta4993aigc6350-a.oregon-postgres.render.com:5432/footballapi?ssl=true') // Example for postgres

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function  doIt(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
doIt();


module.exports = db;



//let sequelize;
/* if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('aca')
}
 */
  //sequelize = new Sequelize(config.database, config.username, config.password, config);