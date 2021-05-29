//2->install nodemon using command "sudo npm install -g nodemon" in current directory FOR AUTO RUNNING TERMINAL
//before"node expserver.js" BUT after installing , use that code "nodemon expserver.js" 
//3->install middleware module called body-parser"npm install body-parser"
const express = require("express");
const bodyParser = require("body-parser");

const app = express();//this is object of express


//it will give a power of fetching data from html page
//you will get property of res.body.variableName
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
// home page
app.get("/", function (req, res) {
    res.send("Welcome to home page :) :")
});
// aboutus page
app.get("/aboutUs", function (req, res) {
    // res.send("Welcome to about page :")
    res.render('test0', { title: 'this will be heading', message: 'Hello there!' })
});
//contact us page
app.get("/contactUs", function (req, res) {
    res.send("address : anshuman19@gmail.com")
});
// calculator page
app.get("/calculator", function (req, res) {
    //console.log(__dirname);//send current path of directory i.e"/home/anshu_/Documents/messExpress"
    res.sendFile(__dirname + "/htmlPages/index.html");
});
//sending data to calculator
app.post("/calculator", function (req, res) {
    let n1 = Number(req.body.v1);
    let n2 = Number(req.body.v2);
    let sum = n1 + n2;
    res.send("sum of 2 no is " + sum);
});
app.get("/showDBresult", function (req, res) {
    res.sendFile(__dirname + "/htmlPages/semesterR.html");
});
app.post("/showDBresult", function (req, res) {
    console.log(req.body);
    res.send(req.body);
    // req.body.user_message.values="ypoooo";
    // req.body.user_message="yoooo";
    // req.send();
});
//showLeaves"
app.post("/addSemester", function (req, res) {
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let program = req.body.program;
    let year_of_admission = req.body.year_of_admission;
    console.log(start_date);
    console.log(end_date);
    console.log(program);
    console.log(year_of_admission);

    if (start_date == null || end_date == null || program == null || year_of_admission == null) {
        console.log("all details are not there");
        res.render('message', { title: 'Not proper entry', message: 'Enter all the detials' });
    }
    else {
        let mysql = require('mysql');
        let conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "A9540",
            database: "mess"
        });
        conn.connect();
        // conn.connect( function(err){ if (err) throw err;...
        console.log("connected!");

        // let sqlQuery = "INSERT INTO Semesters (start_date, end_date, program, year_of_admission) VALUES ('2021-01-05', '2021-05-02', 'btech', 2005)";
        // conn.query(sqlQuery, function (err, result) {
        //     if (err) throw err;
        //     console.log("record inserted");
        // });

        conn.end();
        res.sendFile(__dirname + "/htmlPages/semesterR.html");
    }

});

app.get("/semester", function (req, res) {//getting from semesterR.html
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "A9540",
        database: "mess"
    });
    conn.connect();
    var sqlQuery = "select  DATE_FORMAT(start_date,'%d %M %Y') as start_date, DATE_FORMAT(end_date,'%d %M %Y') as end_date,program,year_of_admission  from Semesters;";
    conn.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log("error occur");
            throw err;
        }
        res.render('semester', { title: 'Semester Details', items: rows })
    });


    conn.end();
});

//create server with 3000 port
//calling a function request and response
//when port 3000 is ready then it will execute
app.listen(3000, function (req, res) {
    console.log("server is running PORT 3000")
});



