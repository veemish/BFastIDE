'use strict'

var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;
var errCode = require('../erroCode');

router.get('/', function(request, response){
    cli.database.getAllRepository()
    .then(repos=>{
        response.json(repos);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/:name', function(request, response){
    cli.database.getRepository(request.params.name)
    .then(repo=>{
        response.json(repo);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    })
});

// router.post('/', function(request, response){

// });

module.exports = router;
