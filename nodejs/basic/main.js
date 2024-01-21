var http = require("http");

http.createServer(( req , resp ) => {
    resp.writeHead(200, { "content-Type" : "text/plain" });
    resp.end("Hello world Ok.");

}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");