var express = require('express');
var router = express.Router();
var otherRouter = require('./users')

/* GET groups listing. */
router.get('', function(req, res, next) {

    // call the get on users and retrieve all data from that request

    res.send('GET for the groups');
});
