const express = require("express");
const bodyParser = require("body-parser");
const app = express();//this is object of express

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const mariadb = require("mariadb");
//auto generated code
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
// app.use("/users", usersRouter);

//variables
var RESULT="";
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "A9540",
    connectionLimit: 5,
    database: "mess",
});

function returnLeaves(){
    RESULT="";

    pool
    .getConnection()
    .then((conn) => {
    conn
        .query("select * from Leaves")
        .then((rows) => {
            console.log(rows);
            RESULT=RESULT.concat("\n",rows);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

    return RESULT;
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

app.use(bodyParser.urlencoded({extended:true}));

// home page
app.get("/",function(req,res){
    res.send("Welcome to Data Base page :")
});

app.get("/dbResult",function(req,res){
    res.sendFile(__dirname+"/htmlPages/semesterR.html");
   
});

app.get("/timepass",function(req,res){
    console.log(__dirname);
    // res.sendFile(__dirname+"/htmlPages/semesterR.html");
    res.sendFile(__dirname+"/htmlPages/index.html");
   
});

// app.post("/dbResult",function(req,res){
//     res.send(returnLeaves);
// });

app.listen(5000,function(req, res){
    console.log("DataBase server is running PORT 5000")
});


module.exports = app;

