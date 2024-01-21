var express = require("express");
var app = express();

//http://localhost:3000/
app.get("/", (req,res) => {
   res.send("Get Method");
});

app.post("/", (req,res) => {
    res.send("Post Method");
 });
 

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});