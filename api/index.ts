const express = require("express");
const app = express();

app.get("/", (req, res) => {

  console.log(JSON.stringify(req))
  res.send(req)
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  }
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM bags');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}