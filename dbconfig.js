import { Sequelize } from 'sequelize';

const config = {
  host: "ep-bold-bar-acqwvoay-pooler.sa-east-1.aws.neon.tech",
  database: "neondb",
  user: "neondb_owner",
  password: "npg_wfHJestI1kO8",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
};

const DB_URL = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

export const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: config.ssl.rejectUnauthorized 
    }
  },
  logging: console.log
});