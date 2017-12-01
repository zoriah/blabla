const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;

// the MongoDB endpoint adress with database named "mean".
let mongoEndpoint = 'mongodb://localhost:27017/mean';

// Connect
const connection = (closure) => {
    return MongoClient.connect(mongoEndpoint, (err, db) => {
        if(err) 
            return console.log(err);
        console.log("DB connection to: "+mongoEndpoint+" has been established!");
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;