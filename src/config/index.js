require('dotenv').config();
module.exports = {
  development:{
    username: 'matias',
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST_EXT,
    dialect: "postgres",
    timestamps:false,
    port: process.env.PORT_DB,
    dialectOptions:{
      ssl:true
    }
  }
}





/*   "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  } */
/* 

  
  
    development:{
    username: 'postgres',
    password: 'olakase123',
    database: 'football',
    host: 'localhost',
    dialect: "postgres",
    timestamps:false,
    port: 5432,
/*     dialectOptions:{
      ssl:true
    } 
  }
  
  
  */