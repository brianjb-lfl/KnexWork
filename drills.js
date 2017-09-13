'use strict';

const { DATABASE } = require('./config');
// const knex = require('knex')(DATABASE); // this was commented out for Brian's environment
const knex = require('knex')({ // lines below were NOT commented out for Brian's environment
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  }
});


// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 

knex 
  .select()
  .from('grades')
  .where({restaurant_id: 25405})
  .then(results => console.log(JSON.stringify(results, null, 4)));


//let restaurants;

// knex.select('restaurants.id as restID', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//   .from('restaurants')
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .orderBy('date', 'desc')
//   .limit(5)
//   .then(function(restaurants) {

//     //console.log(restaurants);
//     const hydrated = {};
//     restaurants.forEach(row => {
//       if(!(row.restID in hydrated)) {
//         hydrated[row.restID] = {
//           restID: row.restID,
//           name: row.name,
//           cuisine: row.cuisine,
//           borough: row.borough,
//           grades: []
//         };
//       }
//       hydrated[row.restID].grades.push({
//         gradeID: row.gradeId,
//         grade: row.grade,
//         score: row.score
//       });

//     });

//     console.log(JSON.stringify(hydrated));




// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});