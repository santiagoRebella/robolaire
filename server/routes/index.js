const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Robolaire' });
});

router.get('/componer', (req, res) => {
  res.render('index', { title: 'Robolaire' });
});

module.exports = router;

