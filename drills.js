'use strict';

const { DATABASE } = require('./config');
//const knex = require('knex')(DATABASE);
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  }
});


// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
knex
  .insert([{name: 'Seaside Diner', borough: 'Brooklyn',
    cuisine: 'seafood', address_building_number: '2020',
    address_street: '32nd St', 
    address_zipcode: '11201'},
  {name: 'Wendell Os', borough: 'Brooklyn',
    cuisine: 'dance hall', address_building_number: '2020',
    address_street: '32nd St', 
    address_zipcode: '11201'},
  {name: 'Sharons on 5th', borough: 'Brooklyn',
    cuisine: 'tavern', address_building_number: '2020',
    address_street: '32nd St', 
    address_zipcode: '11201'}
  ])
  .into('restaurants')
  .returning(['id', 'name'])
  // .select('id', 'name')
  // .from('restaurants')
  // .where({cuisine: 'Italian'})
  // .whereIn('address_zipcode', ['10012', '10013', '10014'])
  // .limit(5)
  // .debug(true)
  .then(results => console.log(JSON.stringify(results, null, 4)))
  .catch(err => console.log(err));


// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});