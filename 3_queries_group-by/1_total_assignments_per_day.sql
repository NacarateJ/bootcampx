SELECT day, count(*) as total_assignments
FROM assignments
GROUP BY DAY
ORDER BY day;