var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;
var errCode = require('../erroCode');

router.get('/', function(request, response){
    let result = cli.domain.getAllDomain();
    if(result){
        response.json({message: 'Process succeed', domains: result});
    }else{
        response.status(401).json({code: errCode.DOMAIN_ALL_CODE , message: errCode.DOMAIN_ALL_MESSAGE });
    }
});

router.post('/', function(request, response){
    response.json({message:'will generate Kotlin from JSON soon'});
});

router.get('/:name', function(request, response){
    response.json({message: 'get a specific domain'});
});


module.exports = router;