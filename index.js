var ServerConttroller = function (params) {
    this.sys = require("util");
    this.my_http = require("http");
    this.path = require("path");
    this.url = require("url");
    this.filesys = require("fs");
};

ServerConttroller.prototype.createServer = function () {
    var self = this;
    return this.my_http.createServer(function (request, response) {
        console.log("request: ", request.url);
        switch (request.url) {
            case '/':
                self.index(response, '/index.html');
                break;
            case '/sayHallo':
                self.sayHallo(response);
            default:
                self.index(response, request.url);
        }

        
    }).listen(8080);

};


ServerConttroller.prototype.index = function (response, my_url) {
    var self = this;
    var full_path = this.path.join(process.cwd(), my_url);
    this.filesys.exists(full_path, function (path_exists) {
        if (!path_exists) {
            response.writeHeader(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
        }
        else {
            self.filesys.readFile(full_path, "binary", function (err, file) {
                if (err) {
                    response.writeHeader(500, { "Content-Type": "text/plain" });
                    response.write(err + "\n");
                    response.end();
                }
                else {
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }

            });
        }
    });
};

ServerConttroller.prototype.sayHallo = function (response) {
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.write('Hallo', 'binary');
    response.end();
};
module.exports = ServerConttroller;