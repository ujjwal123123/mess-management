-- for hostel table
INSERT INTO Hostels(id, name)
VALUES (100, 'boys_hostel'),
       (101, 'girls_hostel');

-- for rate table
INSERT INTO Rate(start_date, rate)
VALUES ('2020-01-01', 100),
       ('2021-04-16', 150),
       ('2021-05-16', 160);

-- for semester
INSERT INTO Semesters (start_date, end_date, program, year_of_admission)
VALUES ('2021-01-05', '2021-05-02', 'btech', 2019),
       ('2021-03-11', '2021-05-15', 'btech', 2020);

-- for student
INSERT INTO Students (name, email, roll_no, hostel_id)
VALUES
    -- 2019 batch
    ('Aakash Kumar', 'ak@gmail.com', 1901015, 100),
    ('Alok Singh', 'as@gmail.com', 1901103, 100),
    ('Pranjal Kumari', 'pk@gmail.com', 1901077, 101),
    ('Rasmi Singh', 'rs@gamil.com', 1901009, 101),
    -- 2020 batch
    ('Aashish Kumar', 'aashishk@gmail.com', 2001003, 100),
    ('Anmol Singh', 'anmols@gmail.com', 2001165, 100),
    ('Priya Kumari', 'priyak@gmail.com', 2001098, 101),
    ('Remi Singh', 'remis@gamil.com', 2001201, 101);

-- for leaves
INSERT INTO Leaves (roll_no, start_date, end_date, remark)
VALUES (1901009, '2021-01-12', '2021-02-10', null),
       (2001201, '2021-05-01', '2021-05-03', null),
       (2001201, '2021-05-13', '2021-05-16', null);

-- for user
INSERT INTO Users(loginId,loginPass)
VALUES ('a@gmail.com','abc'),
       ('u@gmail.com','abc');
