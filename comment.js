// Create web server
// 1. Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

// 2. Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    var queryObj = querystring.parse(query);
    var filePath = '.' + pathname;
    if (filePath == './') {
        filePath = './index.html';
    }
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    fs.exists(filePath, function (exists) {
        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
});

// 3. Listen on port 8000, IP defaults to