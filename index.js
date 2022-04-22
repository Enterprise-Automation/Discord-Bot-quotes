const express = require('express');
const quoteRepo = require("./repo/quoteRepo");
const res = require("express/lib/response");
let router = express.Router();
const app = express();
app.use(express.json());
const mysql = require("mysql");
const function_module = require('./validate/functionsValidate.js');
const Promise = require('promise');
const fs = require('fs');
const path = require("path");


app.use(express.static('public'));
app.use(express.text());

router.get('/validate/quote,listAll', function (req, res, next) {
    quoteRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "message": "All quotes retrieved.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.get('/', function (req, res, next) {
    quoteRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "message": "All quotes retrieved.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});
router.get('/random', function (req, res, next) {
    quoteRepo.getRandom(function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "ok",
                "message": "Random quote retrieved",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The quote '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The quote '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

router.get('/:id', function (req, res, next) {
    quoteRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "ok",
                "message": "Single quote retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The quote '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The quote '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});



app.use('/api/', router);
var server = app.listen(3000, function () {
    console.log('Server running on http://localhost:3000..');
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Renegade187!',
    database: 'mysql'
});

connection.connect();

//Command 

//Get all quotes from database
connection.query("SELECT * FROM `quotes`", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

// Get random quote
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1, 24)
// console.log(rndInt)

connection.query(`SELECT * FROM quotes WHERE id= ${rndInt}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

// Get by id from database 
const id = '2'
connection.query(`SELECT * FROM quotes WHERE id= ${id}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

// Add all routes
fs.readdirSync(path.join(__dirname, "validate")).forEach(function (file) {
    if (file[0] === ".") {
        return;
    }
    require(path.join(__dirname, "validate", file))(app);
});