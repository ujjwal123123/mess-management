-- Setup the database schema

drop database mess;
create database mess;
use mess;

create table Hostels
(
    id   integer primary key,
    name varchar(30)
);

create table Students
(
    name         varchar(30),
    email        varchar(40),
    roll_no      int(7) primary key,
    unpaidAmount int,
    hostel_id    int REFERENCES Hostels (id)
);

create table Leaves
(
    roll_no    int(7) references Students (roll_no),
    start_date date,
    end_date   date,
    remark     varchar(240),
    primary key (roll_no, start_date)
);

create table Semesters
(
    start_date        date,
    end_date          date,
    program           ENUM ('btech','mtech','phd'),
    year_of_admission year,
    primary key (start_date, program, year_of_admission)
);

create table Rate
(
    start_date date primary key,
    rate       int
);