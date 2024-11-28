const express = require("express");
const app = express();
const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

app.get("/", (req, res) => {

  console.log("dadada")

  console.log(req)

  res.send("hiiiii")
}
)


app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

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
