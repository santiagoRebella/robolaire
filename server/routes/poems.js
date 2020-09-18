
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const {getRimedPhrase, getRimed2Phrase, getRandomPhrase} = require('../poet/poet');

router.get('/', (req, res) => (async () => {
  const pool = new Pool();
  const result = await pool.query('SELECT * FROM poems')
  await pool.end();
  res.json({rowCount: result.rowCount, rows: result.rows});
})());

router.get('/rimed2', (req, res) => (async () => {
  res.send(getRimed2Phrase());
})());

router.get('/rimed', (req, res) => (async () => {
  res.send(getRimedPhrase());
})());

router.get('/random', (req, res) => (async () => {
  res.send(getRandomPhrase());
})());

module.exports = router;





/**
 * 
 * 
 *     Conjuntivas. Por ejemplo: y, e, ni, no solo… sino también, ni siquiera. 
    Adversativas. Por ejemplo: pero, aunque, al contrario, en cambio, sin embargo, a pesar de.
    Disyuntivas. Por ejemplo: o, o bien. 
    Explicativas. Por ejemplo: o sea, es decir, esto es. 

Conjunciones subordinantes. Unen la oración principal con una oración o proposición subordinada. Las proposiciones subordinadas son aquellas que no pueden funcionar de manera autónoma: su significado no está completo sin la oración principal.

    Causales. Por ejemplo: porque, dado que, ya que, debido a que, puesto que. 
    Condicionales. Por ejemplo: si, sino, a condición de que, a menos que, en caso de que, con tal de que, siempre que. 
    Concesivas. Por ejemplo: aunque, aun cuando, a pesar de, aun si, por más que, así. 
    Consecutivas. Por ejemplo: así que, de modo que, de forma que, entonces, por eso, por consiguiente, de ahí que, por ende. 
    Finales. Por ejemplo: para, para que, a fin de que. 
    Modales. Por ejemplo: como, tal como, según, sin que. 
    Temporales. Por ejemplo: antes de que, apenas, después de que, tan pronto como, cuando, siempre que, hasta que. 


Fuente: https://www.ejemplos.co/lista-de-conjunciones-con-ejemplos/#ixzz6XFOe8pP4

 */

