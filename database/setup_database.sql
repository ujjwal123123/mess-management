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
    hostel_id    int not null references Hostels (id),
    closing_date date
);

create table Leaves
(
    id         int unsigned auto_increment primary key,
    roll_no    int(7) not null references Students (roll_no) on delete cascade,
    start_date date,
    end_date   date,
    remark     varchar(500),
    unique (roll_no, start_date),
    CHECK (end_date >= start_date)
);

create table Semesters
(
    id                int unsigned auto_increment primary key,
    start_date        date,
    end_date          date,
    program           enum ('btech','mtech','phd'),
    year_of_admission year,
    unique (start_date, program, year_of_admission),
    CHECK (end_date >= start_date)
);

create table Rate
(
    start_date date primary key,
    rate       int
);

create table Users
(
    login_id     varchar(40) primary key,
    login_pass   varchar(100)
);

