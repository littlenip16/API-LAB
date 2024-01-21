var express = require("express");
var app = express();

app.use("/asset", express.static("public"));

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});