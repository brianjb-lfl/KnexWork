'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();




app.get('/restaurants', (req, res) => {
  console.log('apt.get running');
  knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

// ADD ANSWERS HERE

app.listen(PORT);
console.log(`app listening on port ${PORT}`);
