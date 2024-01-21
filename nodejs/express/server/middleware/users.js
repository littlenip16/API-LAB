var express = require("express");
var router = express.Router();

router.use((req,res,next) => {
    console.log("Request URL : " , req.originalUrl);
    console.log("Request Method : ", req.method);
    next();
});

router.get("/", (req,res) => {
res.send("user router .....");
});

router.get("/:username",(req,res) => {
 res.send(req.params);
});

module.exports =router;