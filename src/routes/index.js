'use strict'

var  express = require('express');
var router = express.Router();

router.get('/',function(request, response){
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

router.get('/version', function(req, res, next) {
  res.json({version:'1.0.0', name:'ethan'});
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

/**
 * proxy to spring boot data REST
 */
router.all('/api/*', function(request, response){
  response.json({url: request.url});
});

module.exports = router;
