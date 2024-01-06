require("dotenv").config();

module.exports = {
  dbGoogle: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_MASTER,
  },
};
