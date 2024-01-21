var express = require("express");
var app = express();
var mw = require("./my-middleware");


// Application middleware
app.use(mw({ option1: "1" , option2: "2"}));


var users = require("./users");


// Route middleware
app.use("/users", users);

app.get("/",(req,res) => {
    res.send("Hello World!!!!!  ");

 });

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
})