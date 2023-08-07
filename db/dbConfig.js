const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const db = pgp(cn);

db.connect()
  .then((obj) => {
    //Checking the server version (pg-promise v10.1.0+):
    const serverVersion = obj.client.serverVersion;
    console.log("Postgres connection established");
    obj.done(); //A success, release the connection;
  })
  .catch((e) => {
    console.log("ERROR:", e.message || e);
  });

module.exports = db;
