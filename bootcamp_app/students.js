//////////////////////////////////////////////////////////////////////////////
//  Connect to the database
//////////////////////////////////////////////////////////////////////////////

// Pool is the prefered way to query with node-postgres,
// because it manages multiple client connections
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

//////////////////////////////////////////////////////////////////////////////
// Queries
//////////////////////////////////////////////////////////////////////////////

// Values that come from somewhere else
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

// Query
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;


// Send both parts to the database 

// pool.query is a function that accepts an SQL query as a JavaScript string
// The function then returns a promise that contains our result when the
// query is successful
pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));