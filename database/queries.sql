-- number of days in a semester
set @start = "2021-01-01", @finish = "2021-06-01";

select *
from Semesters
where start_date BETWEEN @start and @finish
  and end_date between @start and @finish;


-- leave history of a student
select * from Leaves;