var ServerConttroller = require('./index.js');
console.log('starte Server...');
var server = new ServerConttroller();
var controllServer = server.createServer();
console.log('server is Running');