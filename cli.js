'use strict'

var os = require('os');
var child_process = require ('child_process');
var  process = require( 'process');
var path = require('path');
var file = require('fs');

let osP = os.platform();
let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';

let CliController = {
    checkProject: function () {
        let daasFile
        try{
            daasFile = file.readdirSync(__dirname+'/spring/daas');
        }catch {
            daasFile = null
        }
        return daasFile;
    },

    initProject: function(){
        try{
            child_process.execSync(osP==='win32'?'init.bat':'bash ./init.sh',{
                cwd: __dirname+'/spring/'
            });
            return "Project initiated" 
        }catch(e){
            console.log(e);
            return null;
        }
    },
    domain: domainController(),
};

function domainController(){
    return {
        createDomain: function(schema){
    
        },
        getDomain: function(name){
    
        },
        getAllDomain: function(){
            try{
                return file.readdirSync(__dirname + projectFolder + '/domain');
            }catch(e){
                console.log(e);
                return null
            }
        },
        deleteDomain: function(name){
    
        },
        updateDomain: function(name){
    
        }
    };
}

module.exports.cli = CliController;