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
    const{ original : { code, sqlMessage }} = err;
    res.status(400).send({ error : { name: code, message : sqlMessage}});
  })
});


// Fetch by id
router.get('/:id', function(req, res, next)  {
  User.findByPk(req.params.id).then(data => {
    if(data) {
      res.send(data);
    } else {
      res.status(400).send({ error : { name : "DataNotFound", message: "DataNotFound"}});
    }
  })
});

//Create
router.post('/', function(req, res, next) {
  User.create(req.body).then(data => {
    res.send({success : {message : "Inserted successfully.", result : data}});
  }).catch((err) => {
    const{ original : { code, sqlMessage }} = err;
    res.status(400).send({ error : { name: code, message : sqlMessage}});
  });
});

// UPDATE
router.put('/:id', function(req,res,next) {
  User.update(req.body, { where : { id : req.params.id }}).then(data => {
    console.log(data);
    if(data[0] > 0) {
      User.findByPk(req.params.id).then(data => {
        res.send({success : { message : "Updated successfully.", result : data}});
      });
    } else {
      res.status(400).send({ error : { name : "DataNotFound", message: "DataNotFound"}});
    }
  }).catch((err) => {
    const{ original : { code, sqlMessage }} = err;
    res.status(400).send({ error : { name: code, message : sqlMessage}});
  });
});

//PATCH
router.patch('/:id', function(req,res,next) {
  User.update(req.body, { where : { id : req.params.id }}).then(data => {
    console.log(data);
    if(data[0] > 0) {
      User.findByPk(req.params.id).then(data => {
        res.send({success : { message : "Updated successfully.", result : data}});
      });
    } else {
      res.status(400).send({ error : { name : "DataNotFound", message: "DataNotFound"}});
    }
  }).catch((err) => {
    const{ original : { code, sqlMessage }} = err;
    res.status(400).send({ error : { name: code, message : sqlMessage}});
  });
});

// DELETE
router.delete('/:id', function(req,res,next) {
  User.findByPk(req.params.id).then(data => {
    if(data != null){
      data.destroy().then(result => {
        res.send({ success : { message : "Deleted successfully.", result : data }})
      })
    } else{
      res.status(400).send({ error : { name : "DataNotFound", message: "DataNotFound"}});
    }
  });
});

module.exports = router;
