'use strict'

var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;

router.get('/', function(request, response){
    cli.checkProject()
    .then(value=>{
        response.json(value);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/init', function(request, response){
    cli.git.clone({replace: request.query.replace})
    .then(result=>{
        response.json(result);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/update', function(request, response){
    cli.git.update()
    .then(value=>{
        response.json(value);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

module.exports = router;
