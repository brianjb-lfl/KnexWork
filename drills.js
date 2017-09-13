'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE); // this was commented out for Brian's environment
// const knex = require('knex')({ // lines below were NOT commented out for Brian's environment
//   client: 'pg',
//   connection: {
//     database: 'dev-restaurants-app'
//   }
// });


// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
knex
//('restaurants')
//   .where({nyc_restaurant_id: '50018947'})
//   .update({
//     name: 'La Pollera Colorada 33',
//   })
  // .insert([{name: 'Seaside Diner', borough: 'Brooklyn',
  //   cuisine: 'seafood', address_building_number: '2020',
  //   address_street: '32nd St', 
  //   address_zipcode: '11201'},
  // {name: 'Wendell Os', borough: 'Brooklyn',
  //   cuisine: 'dance hall', address_building_number: '2020',
  //   address_street: '32nd St', 
  //   address_zipcode: '11201'},
  // {name: 'Sharons on 5th', borough: 'Brooklyn',
  //   cuisine: 'tavern', address_building_number: '2020',
  //   address_street: '32nd St', 
  //   address_zipcode: '11201'}
  // ])
  // .into('restaurants')
  //.returning(['id', 'name', 'nyc_restaurant_id'])
  // .select('id', 'name', 'nyc_restaurant_id')
  // .from('restaurants')
  // .where({nyc_restaurant_id: '50018947'})
  // .where({name: 'Dj Reynolds Pub And Restaurant'})
  // .whereIn('address_zipcode', ['10012', '10013', '10014'])
  // .limit(5)
  // .debug(true)
  // .orderBy('nyc_restaurant_id', 'asc')

  // ('restaurants')
  // .where({id: 25249})
  // .del()

  // .select('id', 'restaurant_id')
  // .from('grades')
  //.where({id: 11})

  // .select('id')
  // .from('restaurants')
  // .where({id: 25249})

  .select('id', 'name', 'cuisine', 'borough')
  .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
  .from('restaurants')
  .limit(10)
  .then(results => console.log(JSON.stringify(results, null, 4)))
  .catch(err => console.log(err));


// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});