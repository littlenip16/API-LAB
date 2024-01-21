var express = require("express");
var router = express.Router();

router.get("/", (req,res) => {
res.send("user router .....");
});

router.get("/:username",(req,res) => {
 res.send(req.params);
});

module.exports =router;
