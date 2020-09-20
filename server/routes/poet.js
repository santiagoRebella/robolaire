
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const {verso, estrofa, poema} = require('../poet/poet');

router.get('/', (req, res) => (async () => {
  const ip = req.ip;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  const result = await pool.query('SELECT * FROM poema')
  const hasContributed = result.rows.find(x => x.ip === ip);

  console.log('hasContributed', hasContributed)

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
      const queryText = 'INSERT INTO poema(verso, ip) VALUES($1, $2) RETURNING *'
      const transaction = await client.query(queryText, [contribucion, ip])
      await client.query('COMMIT');
      console.log(transaction);
      const fresh = await pool.query('SELECT * FROM poema');
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
