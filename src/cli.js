'use strict'

let DomainController = require('./controllers/DomainController').DomainController;
let RepositoryController = require('./controllers/RepositoryController').RepositoryController;
let GitController = require('./controllers/GitController').GitController;
let SchemaController = require('./controllers/SchemaController').SchemaController;
let ProjectController = require('./controllers/ProjectController').ProjectController;
let DatabaseController = require('./controllers/DatabaseController').DatabaseController;
let LogsController = require('./controllers/LogsController').LogsController;

let CliController = {
    project: new ProjectController(),
    git: new GitController(),
    domain: new DomainController(),
    database: new RepositoryController(),
    schema: new SchemaController(),
    database: new DatabaseController(),
    logs: new LogsController(),
};

module.exports.cli = CliController;
