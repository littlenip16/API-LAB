var express = require("express");
var app = express();

var mw = require("./my-middleware");

app.use(mw({ option1: "1" , option2: "2"}));

app.get("/",(req,res) => {
    res.send("Hello World!!!!!  " + req.requestTime);

 });

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
})