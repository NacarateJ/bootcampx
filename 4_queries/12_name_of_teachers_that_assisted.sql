SELECT DISTINCT teachers.name AS teacher,
cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ar ON ar.teacher_id = teachers.id
JOIN students ON students.id = ar.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;