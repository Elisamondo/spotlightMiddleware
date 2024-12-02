const express = require("express");
const app = express();
const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const bodyParser = require('body-parser');
require('dotenv').config();



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.listen(3000, () => console.log("Server ready on port 3000."));



module.exports = app;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  }
});

console.log("connecting client")
const client =  pool.connect().then(
  console.log("client connected")
)


app.get("/", async (req, res) => {

  res.send("catch")
  }

)

app.get("/GET", async (req, res) => {

  console.log(res.query)
  if (req.query.SQL){
    console.log(req)

    console.log("query exists")
  
    let command = req.query.SQL
    
    try {
      const result = await pool.query(command)
      res.send(result.rows);
    } catch (error) {
      console.error("Error executing query:", error)
      res.status(500).send({
        message: 'Error executing query',
        error: error.message,
      });
    client.release()
  }}

  res.status(400).send({
    message: "no SQL Query received",
  })
  client.release()
})

app.post("/POST", async (req, res) => {

    console.log(`POST Received - \n ${JSON.stringify(req)}`)


  res.send("This doesnt work yet")
  client.release()
})