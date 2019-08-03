'use strict'

var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;

router.get('/', function(request, response){
    cli.schema.getAllSchema()
    .then(schemas=>{
        response.json(schemas);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

// router.post('/', function(request, response){
//     cli.domain.createDomain(request.body)
//     .then(domain=>{
//         response.json(domain);
//     })
//     .catch(reason=>{
//         response.status(401).json(reason);
//     });
// });

router.get('/:name', function(request, response){
    cli.schema.getSchema(request.params.name)
    .then(schema=>{
        response.json(schema);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    })
});

// router.delete('/:name', function(request, response){
//     cli.schema.deleteSchema(request.params.name)
//     .then(domain=>{
//         response.json(domain);
//     })
//     .catch(reason=>{
//         response.status(401).json(reason);
//     })
// });


module.exports = router;