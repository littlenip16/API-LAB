var express = require('express');
var router = express.Router();

const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost', user: 'root' , password: 'admin' , database: 'shopper'


})
// GET
router.get("/",(req,res,next) => {
    // FILTER
    let { page = 1, limit = 2, sort = "id", order = "asc", ...filter }  = req.query;
    filter = Object.keys(filter).length === 0 ? "1" : filter;
    page = parseInt(page);
    limit = parseInt(limit);

    let offset = (page - 1) * limit;
    let sql = limit > 0 ? `SELECT * FROM product WHERE ? ORDER BY ${sort} ${order} LIMIT ?, ?` : `SELECT * FROM product WHERE ? ORDER BY ${sort} ${order}`;
    console.log(filter);

    conn.query(sql, [filter, offset, limit], (err, datas,fields) => {
        if(err){
            const { code ,sqlMessage } = err;
            res.status(400).send({error : { name : code , message : sqlMessage }});
        } else {
            res.send(datas);
        }
        
    })
});

//GET BY ID
router.get("/:id",(req,res,next) => {
    conn.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, datas,fields) => {
        if(datas.length > 0){
            res.send(datas[0]);
        } else {
            res.status(400).send({error : { name : "DataNotFound" , message : "DataNotFound" }});
        }
        
    })
});


// CREATE
router.post("/", (req,res,next) => {
    conn.query("INSERT INTO product SET ?", req.body, (err, datas, fields) => {
        if(err){
            const { code ,sqlMessage } = err;
            res.status(400).send({error : { name : code , message : sqlMessage }});
        } else {
            res.send({ success : { message : "Inserted successfilly.", result : datas}})
        }
    })
});

// UPDATE

router.put("/:id", (req,res,next) => {
    conn.query("UPDATE product SET ? WHERE id = ?", [req.body, req.params.id], (err, datas, fields) => {
        if(err){
            const { code ,sqlMessage } = err;
            res.status(400).send({error : { name : code , message : sqlMessage }});
        } else if(datas.affectedRows == 0){
            res.status(400).send({error : { name : "DataNotFound" , message : "DataNotFound" }});
        } else {
            res.send({ success : { message : "Updated successfilly.", result : req.body}})
        }
    })
});

// UPDATE

router.patch("/:id", (req,res,next) => {
    conn.query("UPDATE product SET ? WHERE id = ?", [req.body, req.params.id], (err, datas, fields) => {
        if(err){
            const { code ,sqlMessage } = err;
            res.status(400).send({error : { name : code , message : sqlMessage }});
        } else if(datas.affectedRows == 0){
            res.status(400).send({error : { name : "DataNotFound" , message : "DataNotFound" }});
        } else {
            res.send({ success : { message : "Updated successfilly.", result : req.body}})
        }
    })
});


// DELETE
function productMiddleware(req, res, next) {
    conn.query("SELECT * FROM product WHERE id = ?", [req.params.id], (err, datas, fields) =>{
        req.product = datas[0];
        next();
    });
}

router.delete("/:id",productMiddleware, (req,res,next) => {
    conn.query("DELETE FROM product WHERE id = ?", [req.params.id], (err, datas, fields) => {
        if(err){
            const { code ,sqlMessage } = err;
            res.status(400).send({error : { name : code , message : sqlMessage }});
        } else if(datas.affectedRows == 0){
            res.status(400).send({error : { name : "DataNotFound" , message : "DataNotFound" }});
        } else {
            res.send({ success : { message : "Deleted successfilly.", result : req.product}})
        }
    })
});

module.exports = router;