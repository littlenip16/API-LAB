var express = require('express');
var router = express.Router();


var { User } = require("../../../models");


// Fetch all users
router.get('/', function(req, res, next) {
  User.findAll({}).then(data => {
    res.send(data);
  })
});

module.exports = router;
