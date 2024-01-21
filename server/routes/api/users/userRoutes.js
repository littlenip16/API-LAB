var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();

var { User } = require("../../../models");
const { or } = require('sequelize');

// Fetch all users
router.get('/', function(req, res, next) {
  let { page = 1, limit = 10, sort = "id", order = "asc", ...filter }  = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let offset = (page - 1) * limit;


  User.findAll({
    where: filter,offset,limit: limit <= 0 ? undefined : limit,order: [[sort, order]]
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
router.post('/',
body('firstName').if(body('firstName').exists()).not().isEmpty().trim().escape(), 
body('lastName').if(body('lastName').exists()).not().isEmpty().trim().escape(),
body('birthDate').if(body('BirthDate').exists()).isDate(),
body('password').if(body('password').exists()).not().notEmpty().isLength({ min: 4 , max : 20})
.withMessage("must be at 4 to 20 chars long.").trim(),
body('email').if(body('email').exists()).not().notEmpty().isEmail().normalizeEmail(), 


function(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).send({errors : errors.array()});
  } else {
    User.create(req.body).then(data => {
      res.send({success : { message : "Inserted successfully.", result : data}});
    }).catch((err) => {
      const{ original : { code, sqlMessage }} = err;
      res.status(400).send({ error : { name: code, message : sqlMessage}});
    });
  }
});

// UPDATE
router.put('/:id',
body('firstName').if(body('firstName').exists()).not().isEmpty().trim().escape(), 
body('lastName').if(body('lastName').exists()).not().isEmpty().trim().escape(),
body('birthDate').if(body('BirthDate').exists()).isDate(),
body('password').if(body('password').exists()).not().notEmpty().isLength({ min: 4 , max : 20})
.withMessage("must be at 4 to 20 chars long.").trim(),
body('email').if(body('email').exists()).not().notEmpty().isEmail().normalizeEmail(), 

function(req,res,next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).send({errors : errors.array()});
  } else {
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
  }
});


//PATCH
router.patch('/:id',
body('firstName').if(body('firstName').exists()).trim().escape(), 
body('lastName').if(body('lastName').exists()).trim().escape(),
body('password').if(body('password').exists()).trim(),
body('email').if(body('email').exists()).normalizeEmail(), 

function(req,res,next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).send({errors : errors.array()});
  } else {
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
      const{  errors : [validationErrorItem], original } = err;
      res.status(400).send({ 
        error : {
          name: original ? original.code : validationErrorItem.type,
          message : original ? original.sqlMessage : validationErrorItem.message
        }
      });
    });
  }
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
