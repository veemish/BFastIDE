'use strict'

var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;
var errCode = require('../erroCode');

router.get('/', function(request, response){
    cli.domain.getAllDomain()
    .then(domains=>{
        response.json(domains);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.post('/', function(request, response){
    cli.domain.createDomain(request.body)
    .then(domain=>{
        response.json(domain);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/:name', function(request, response){
    cli.domain.getDomain(request.params.name)
    .then(domain=>{
        response.json(domain);
    })
    .catch(reason=>{
        // console.log(reason);
        response.status(401).json(reason);
    })
});


module.exports = router;