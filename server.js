require('dotenv').config();
const http = require('http')
const port = 8080

const server = http.createServer((req, res) => {

  console.log(req)

})
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

server.listen(port, function (error) {

  // Checking any error occur while listening on port
  if (error) {
      console.log(`error: \n ${error}`);
  }
  // Else sent message of listening
  else {
      console.log(`Server is listening on port: ${port}`);
  }
})

