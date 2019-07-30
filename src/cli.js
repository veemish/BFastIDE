'use strict'

var os = require('os');
var child_process = require ('child_process');
var file = require('fs');
let DomainController = require('./controllers/DomainController').DomainController;
let RepositoryController = require('./controllers/RepositoryController').RepositoryController;

let osP = os.platform();

let CliController = {
    checkProject: function () {
        return new Promise((resolve, reject)=>{
            let daasFile
            try{
                daasFile = file.readdirSync(__dirname+'/spring/daas');
                resolve(daasFile);
            }catch(e) {
                reject(e);
            }
        });
    },

    initProject: function(){
        return new Promise((resolve, reject)=>{
            try{
                child_process.execSync(osP==='win32'?'init.bat' : 'bash ./init.sh',{
                    cwd: __dirname+'/spring/'
                });
                resolve("Project initiated");
            }catch(e){
                reject(e);
            }
        });
    },
    domain: DomainController,
    repo: RepositoryController,
};

module.exports.cli = CliController;