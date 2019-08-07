'use strict'

var file = require('fs');
var path = require('path');
var process = require('child_process');
var nodeGit = require('nodegit');
var errCode = require('../erroCode');
var GitController = require('./GitController').GitController;

let gitController = new GitController();

module.exports.ProjectController = class{

    /**
     * Bootsrap project follder
     * @param {replace: string} options 
     */
    initializeProject(options){
       return  gitController.clone(options);
    }

    /**
     * Get if project folder exist
     */
    getProjectFolder(){
        return new Promise((resolve, reject)=>{
            file.readdir(path.join(__dirname, '../spring/daas'),(err,files)=>{
                if(err){
                    reject({code: errCode.NO_FOLDER_CODE , message: errCode.NO_FOLDER_MESSAGE, error: e});
                }else{
                    resolve({message: "Folder project exist", folder: files});
                }
            });
        });
    }

    /**
     * check if a git project folder exist
     */
    getGitFolder(){
        return new Promise((resolve, reject)=>{
            nodeGit.Repository.open(path.join(__dirname, '../spring/daas'))
            .then(_=>{
                resolve({message: "Git foler exist"});
            })
            .catch(reason=>{
                reject({code: errCode.GIT_FOLDER_GET_CODE , message: errCode.GIT_FOLDER_GET_MESSAGE, error: reason});
            })
        })
    }

    /**
     * Update git folder against the main bootsrap project
     */
    updateProjectFolder(){
        return gitController.update();
    }

    /**
     * 
     * @param {its a web socket connection } connection 
     */
    build(connection){
        let buildProcess = process.exec('bash gradlew build',{
            cwd: path.join(__dirname, '../spring/daas/')
        });
        buildProcess.stdout.on('data',(data)=>{
            // console.log(data);
            connection.sendUTF(data);
        });
        buildProcess.stderr.on('data', (data)=>{
            connection.sendUTF(data);
            connection.close();
        });
        buildProcess.on('close', (code)=>{
            connection.sendUTF('==========TERMINAL CLOSED=========');
            connection.close();
        });

        buildProcess.on('exit', (code)=>{
            connection.close();
        });

        connection.on('close',(code, desc)=>{
            console.log((new Date().toString()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            if(buildProcess){
                buildProcess.kill('SIGTERM');
            }
        });
    }
    
    run(connection, command){
        let buildProcess = process.exec(command,{
            cwd: path.join(__dirname, '../spring/daas/')
        });
        buildProcess.stdout.on('data',(data)=>{
            // console.log(data);
            connection.sendUTF(data);
        });
        buildProcess.stderr.on('data', (data)=>{
            connection.sendUTF(data);
            connection.close();
        });
        buildProcess.on('close', (code)=>{
            connection.sendUTF('==========TERMINAL CLOSED=========');
            connection.close();
        });

        buildProcess.on('exit', (code)=>{
            connection.close();
        });

        connection.on('close',(code, desc)=>{
            console.log((new Date().toString()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            if(buildProcess){
                buildProcess.kill('SIGTERM')
            }
        });
    }

    exportToZip(options){
        return new Promise((resolve, reject)=>{
            if(options && options.database){
                process.exec('cp -r /ide/mdb /ide/src/spring && zip -r app.zip /ide/src/spring',(error,stdout,stderr)=>{
                    if(error){
                        reject({code: -1, message: stderr, error: error});
                    }else{
                        resolve({message: stdout});
                    }
                });
            }else{
                process.exec('rm -r /ide/src/spring/data || zip -r app.zip /ide/src/spring',(error,stdout,stderr)=>{
                    if(error){
                        reject({code: -1, message: stderr, error: error});
                    }else{
                        resolve({message: stdout});
                    }
                });
            }
        });
    }
}
