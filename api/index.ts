const express = require("express");
const app = express();
const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {

  console.log(req)

  console.log(`req query - ${req.query}`)

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
