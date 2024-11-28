const express = require("express");
const app = express();
const { Pool } = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));


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

const client =  pool.connect()


app.get("/", (req, res) => {

  console.log(req)

  if (!req.query.SQL){
    return res.status(400).send({
      message: 'Invalid SQL Query'
    })
  }


  let command = req.query.SQL



  res.send(getQuery(command))
}
)

async function getQuery(command){
  try{
    const result = await client.query(`${command}`);
    return result
  } catch (e){
    return e
  }
}
