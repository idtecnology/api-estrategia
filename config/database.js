const mysql = require("mysql");
const { promisify } = require("util");
const { dbGoogle } = require("./conn.js");

const connectionName =
  process.env.INSTANCE_CONNECTION_NAME || "konectados-00:us-central1:kondat00";

if (process.env.NODE_ENV === "production") {
  dbGoogle.socketPath = `/cloudsql/${connectionName}`;
}

const pool = mysql.createPool(dbGoogle);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS NOT MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }
  if (connection) connection.release();
  console.log("DB is Connected");
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
