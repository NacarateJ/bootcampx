SELECT day, count(*) as total_assignments
FROM assignments
GROUP BY DAY
HAVING count(*) >= 10
ORDER BY day;