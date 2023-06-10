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

// pool.query is a function that accepts an SQL query as a JavaScript string
// The function then returns a promise that contains our result when the
// query is successful
pool.query(`
SELECT DISTINCT teachers.name AS teacher,
cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ar ON ar.teacher_id = teachers.id
JOIN students ON students.id = ar.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '%${process.argv[2] || "JUL02"}%'
ORDER BY teacher;
`)
.then((res) => {
  res.rows.forEach(row => {
    console.log(`
  ${row.cohort}: ${row.teacher}`);
  });
})
.catch((err) => console.error("query error", err.stack));
