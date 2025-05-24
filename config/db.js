// db.js (or database.js)
import { Sequelize } from 'sequelize';
import 'dotenv/config'; // dotenv auto-loads the .env


const logging = process.env.DB_LOGGING === 'true' ? console.log : false;

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: logging
  }
);

export const testConnection = async() => {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);  // Stop server if DB is unreachable
    }
  }



