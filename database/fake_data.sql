-- for hostel table
INSERT INTO Hostels(id, name)
VALUES (100, 'Boys hostel'),
       (101, 'Girls hostel');

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
INSERT INTO Students (name, email, roll_no, hostel_id, closing_date)
VALUES
    -- 2019 batch
    ('Aakash Kumar', 'ak@gmail.com', 1901015, 100, null),
    ('Alok Singh', 'as@gmail.com', 1901103, 100, null),
    ('Pranjal Kumari', 'pk@gmail.com', 1901077, 101, null),
    ('Rasmi Singh', 'rs@gamil.com', 1901009, 101, null),
    -- 2020 batch
    ('Aashish Kumar', 'aashishk@gmail.com', 2001003, 100, null),
    ('Anmol Singh', 'anmols@gmail.com', 2001165, 100, null),
    ('Priya Kumari', 'priyak@gmail.com', 2001098, 101, null),
    ('Remi Singh', 'remis@gamil.com', 2001201, 101, null);

-- for leaves
INSERT INTO Leaves (roll_no, start_date, end_date, remark)
VALUES (1901009, '2021-01-12', '2021-02-10', null),
       (2001201, '2021-05-01', '2021-05-03', null),
       (2001201, '2021-05-13', '2021-05-16', null);

-- for user
INSERT INTO Users(login_id,login_pass)
VALUES ('a@gmail.com','$2b$10$BWRGottmRk7cPE7BawRPi.RxbdHBbJJEqU08DKkXo.YOZdxjg7ZsC'),
	   ('u@gmail.com','$2b$10$ziZzG5pZg9tqneCw9kzumOk8.TQQeGc6DHHy0.cj9Ewc26NrcmA6u');

