'use strict'

// import { Router } from 'express';
var  express = require('express');
var cli  = require('../cli').cli;
var errCode = require('../erroCode');
var router = express.Router();


/* GET home page. */
router.get('/version', function(req, res, next) {
  res.json({version:'1.0.0', name:'ethan'});
});

router.post('/check', function(request, response){
  let result = cli.checkProject();
  if(result){
    response.json({message: "Folder project exist", folder: result});
  }else{
    response.status(401).json({code: errCode.NO_FOLDER_CODE , message: errCode.NO_FOLDER_MESSAGE})
  }
});

router.post('/init', function (request, response) {
  let result = cli.initProject();
  if(result){
    response.json({message: result});
  }else{
    response.status(401).json({code: errCode.INIT_PROJECT_CODE, message: errCode.INIT_PROJECT_MESSAGE });
  }
});

router.get('/help', function (request, response) {
  response.json({
    welcome: 'Helo! Welcome to BFast project',
    version:{
      method: 'GET',
      endpoint: '/version',
      description: 'Check version of the current tool'
    },
    check: {
      method: 'POST',
      endpoint: '/check',
      description: 'Check if DaaS project is being pulled from github'
    },
    init: {
      method: 'POST',
      endpoint: '/init',
      description: 'Initialize a DaaS project by cloning it from github'
    },
    create: {
      method: 'POST',
      endpoint: '/domain',
      description: 'Creat a domain from a JSON file'
    }
  });
});

module.exports = router;
