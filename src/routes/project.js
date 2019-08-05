'use strict'

var express = require('express');
var router = express.Router();
var cli = require('../cli').cli;

router.get('/check/folder', function(request, response){
    cli.project.getProjectFolder()
    .then(value=>{
        response.json(value);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/check/git', function(request, response){
    cli.project.getGitFolder()
    .then(value=>{
        response.json(value);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    })
});

router.get('/init', function(request, response){
    cli.project.initializeProject({replace: request.query.replace})
    .then(result=>{
        response.json(result);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/update', function(request, response){
    cli.project.updateProjectFolder()
    .then(value=>{
        response.json(value);
    })
    .catch(reason=>{
        response.status(401).json(reason);
    });
});

router.get('/export', function(request, response){
    cli.project.exportToZip()
    .then(_=>{
        response.sendFile('/ide/app.zip', (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Done exporting a project');
            }
        });
    })
    .catch(reason=>{
        response.status(503).json(reason);
    });
});

module.exports = router;
