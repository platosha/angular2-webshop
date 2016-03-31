var config = require('lite-server/lib/config-defaults');

var apiRoot = '/api';
var jsonServer = require('json-server');
var server = jsonServer.create();
server.use(apiRoot, jsonServer.defaults());
server.use(apiRoot, jsonServer.router('db.json'));

config.server.middleware.unshift(server);

module.exports = config;
