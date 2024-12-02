const express = require("express");
const app = express();
const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const bodyParser = require('body-parser');
require('dotenv').config();
const util = require('util')




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

  console.log(`POST Received - \n ${JSON.stringify(util.inspect(req.body))}`)

  let columns = "(notes, origin, dateFound, status, "
  let values = `VALUES ( ${req.body.notes}, ${req.body.origin}, ${req.body.dateFound}, ${req.body.status} `

  switch (req.body.category){
    case "clothing":
      columns += "make, type, colours"
      values += `${req.body.make}, ${req.body.type}, ${req.body.colours}`
    break

    case "bags":
    case "booksPapers":
      columns += "make, contents"
      values += `${req.body.make}, ${req.body.contents}`
    break
    case "jewelleryAccessories":
    case "phones":
      columns += "make, colours"
      values += `${req.body.make}, ${req.body.colours}`
      break
    case "keychainsWallets":
      columns += "contents"
      values += `${req.body.contents}`
      break
  }

  columns += ")"
  values += ");"

  try {
    const result = await pool.query(`INSERT INTO ${req.body.category} ${columns} ${values}`)
    res.send(result)

  } catch (e){
    res.send(e)
  }

})