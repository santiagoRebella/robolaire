// const express = require('express');
// const router = express.Router();
// const { Pool } = require('pg');

// /* GET users listing. */
// router.get('/', (req, res, next) => (async () => {
//   const pool = new Pool();
//   const result = await pool.query('SELECT * FROM auto')
//   await pool.end();
//   res.json({rowCount: result.rowCount, rows: result.rows});
// })());

// router.post('/', (req, res, next) => (async () => {
//   if (!req.body.marca || req.body.fecha_de_compra) { res.status(400).send(); }
//   const pool = new Pool();
//   const client = await pool.connect()
//   try {
//     await client.query('BEGIN')
//     const queryText = 'INSERT INTO auto(marca, fecha_de_compra) VALUES($1, $2) RETURNING *'
//     const transaction = await client.query(queryText, [req.body.marca, req.body.fecha_de_compra])

//     await client.query('COMMIT');
//     res.send(transaction);
//   } catch (e) {
//     await client.query('ROLLBACK')
//     console.log(e)
//     res.status(500).send('couldnt create resource');
//   } finally {
//     client.release()
//   }  
// })());

// router.put('/', (req, res, next) => (async () => {
//   if (!req.body) { res.status(400).send(); }
//   const pool = new Pool();
//   const client = await pool.connect()
//   try {
//     await client.query('BEGIN')
//     const queryText = 'UPDATE auto SET fecha_de_compra = $2, marca = $1, id = $3 WHERE id = $3 RETURNING *'
//     const transaction = await client.query(queryText, [req.body.marca, req.body.fecha_de_compra, req.body.id])

//     await client.query('COMMIT');
//     res.send(transaction);
//   } catch (e) {
//     await client.query('ROLLBACK')
//     console.log(e)
//     res.status(500).send('couldnt create resource');
//   } finally {
//     client.release()
//   }
// })());

// router.delete('/:id', (req, res, next) => (async () => {
//   const pool = new Pool();
//   console.log(req.params.id);
//   const result = await pool.query('DELETE FROM auto WHERE id = $1', [req.params.id])
//   await pool.end();
//   res.json(result);
// })());

// module.exports = router;
