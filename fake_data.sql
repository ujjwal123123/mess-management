--for hostel table
INSERT INTO `mess`.`Hostels` (`id`, `name`) VALUES ('100', 'boys_hostel');
INSERT INTO `mess`.`Hostels` (`id`, `name`) VALUES ('101', 'girls_hostel');

--for rate table
INSERT INTO `mess`.`Rate` (`start_date`, `rate`) VALUES ('2020-01-01', '100');
INSERT INTO `mess`.`Rate` (`start_date`, `rate`) VALUES ('2021-04-16', '150');
INSERT INTO `mess`.`Rate` (`start_date`, `rate`) VALUES ('2021-05-16', '160');

--for semester
INSERT INTO `mess`.`Semesters` (`start_date`, `end_date`, `program`, `year_of_admission`) VALUES ('2021-01-05', '2021-05-02', 'btech', 2019);
INSERT INTO `mess`.`Semesters` (`start_date`, `end_date`, `program`, `year_of_admission`) VALUES ('2021-03-11', '2021-05-15', 'btech', 2020);

--for student 
--2019 batch
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Aakash Kumar', 'ak@gmail.com', '1901015', '100');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Alok Singh', 'as@gmail.com', '1901103', '100');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Pranjal Kumari', 'pk@gmail.com', '1901077', '101');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Rasmi Singh', 'rs@gamil.com', '1901009', '101');
--2020 batch
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Aashish Kumar', 'aashishk@gmail.com', '2001003', '100');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Anmol Singh', 'anmols@gmail.com', '2001165', '100');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Priya Kumari', 'priyak@gmail.com', '2001098', '101');
INSERT INTO `mess`.`Students` (`name`, `email`, `roll_no`, `hostel_id`) VALUES ('Remi Singh', 'remis@gamil.com', '2001201', '101');
