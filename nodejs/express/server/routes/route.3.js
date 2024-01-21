var express = require("express");
var app = express();

var cb = (req,res,next) => {
    console.log("This is callback 1");
    next();
}


app.get("/", [cb] , (req,res,next) => {
    console.log("This is callback 2");
    res.send("ok 2");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});