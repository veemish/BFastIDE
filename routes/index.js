var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/version', function(req, res, next) {
  res.json({version:'1.0.0', name:'ethan'});
});

router.get('/help', function (request, response) {
  response.json({
    version:{
      method: 'GET',
      endpoint: '/version',
      description: 'Check version of the current tool'
    },
    create: {
      method: 'POST',
      endpoint: '/domain',
      description: 'Creat a domain from a JSON file'
    }
  });
});

module.exports = router;
