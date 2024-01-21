var express = require('express');
var router = express.Router();


var { User } = require("../../../models");


// Fetch all users
router.get('/', function(req, res, next) {
  let { page = 1, limit = 5, sort = "id", order = "asc", ...filter }  = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let offset = (page - 1) * limit;


  User.findAll({
    where: filter,
    offset,
    limit: limit <= 0 ? undefined : limit,
    order: [[sort, order]]
  }).then(data => {
    res.send(data);
  }).catch((err) => {
    const{ original : { cloneDeep, sqlMessage }} = err;
    res.status(400).send({ error : { name: code, message : sqlMessage}});
  })
});

module.exports = router;
