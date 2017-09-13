'use strict';
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

app.use(jsonParser);


app.get('/restaurants', (req, res) => {
  console.log('apt.get running');
  knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
  // wee need to edit this
  console.log('running on id endpoint');
  knex.first('restaurants.id as restId', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
    .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
    .orderBy('date', 'desc')
    .then(results => res.json(results));
});

app.post('/restaurants', (req, res) => {

  knex
    .insert({
      name: req.body.name,
      cuisine: req.body.cuisine,
      borough: req.body.borough
    })
    .into('restaurants')
    .returning('id')
    .then(function(id) {
      console.log("new rest ID: ", id[0]);
      //let promiseArr = [];
      
      let promiseArr = req.body.grades.map(gr => {

      //req.body.grades.forEach(gr => {
        console.log("adding grade: ", gr);

        return(
          knex
            .insert({
              grade: gr.grade,
              score: gr.score,
              restaurant_id: id[0],
              date: new Date,
            })
            .into('grades')
            .returning('restaurant_id')
        );
        //.then( () => console.log('added'));
      });
      return Promise.all(promiseArr);
    })
    .then( function(id) {
      console.log("id: ", id);
      console.log('ready to send status');
      res.status(201).location(`http://localhost:8080/restaurants/${id[0]}`).send();
    });
});


// ADD ANSWERS HERE

app.listen(PORT);
console.log(`app listening on port ${PORT}`);
