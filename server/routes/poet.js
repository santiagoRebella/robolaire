
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const {verso, estrofa, poema} = require('../poet/poet');

const queries = {
  GET_POEMA: 'SELECT * FROM poema',
  INSERT_VERSO: 'INSERT INTO poema(verso, ip) VALUES($1, $2) RETURNING *',
}

router.get('/', (req, res) => (async () => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
    ssl: false
  });
  const result = await pool.query(queries.GET_POEMA)
  const hasContributed = result.rows.find(x => x.ip === ip);

  if (hasContributed) {
    res.send({
      poema: result.rows,
      contribucion: hasContributed
    });
  } else { 
    const client = await pool.connect()
    try {
      const contribucion = verso();
      await client.query('BEGIN')
      const transaction = await client.query(queries.INSERT_VERSO, [contribucion, ip])
      await client.query('COMMIT');
      const fresh = await pool.query(queries.GET_POEMA);
      res.send({
        poema:fresh.rows,
        contribucion: transaction.rows.find(x => x.ip === ip)
      });
    } catch (e) {
      await client.query('ROLLBACK')
      console.log(e)
      res.status(500).send('couldnt create resource');
    } finally {
      client.release()
    }  
  }
  await pool.end();
})());

router.get('/verso', (req, res) => (async () => {
  res.send(verso());
})());

router.get('/estrofa', (req, res) => (async () => {
  res.send(estrofa());
})());

router.get('/poema', (req, res) => (async () => {
  res.send(poema());
})());

module.exports = router;
