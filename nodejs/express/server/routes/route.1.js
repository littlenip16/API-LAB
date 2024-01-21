var express = require("express");
var app = express();

app.get("/",(req,res) => {
res.send("Hello World!!!!!");
});

//Query Parameter  http://localhost:3000/users?username=june&email=june@mail.com

app.get("/users",(req,res) => {
    res.send(req.query.email);
    });


//url Parameter  http://localhost:3000/users/june/june@mail.com
app.get("/users/:username/:email",(req,res) => {
    res.send(req.params.username);
    });


app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});