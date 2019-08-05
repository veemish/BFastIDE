'use strict'

var os = require('os');
var child_process = require ('child_process');
// var fs = require('fs');
// var nodeGit = require('nodegit');
var path = require('path');
var errCode = require('../erroCode');

let osP = os.platform();

module.exports.GitController = class {

    constructor(){}

    /**
     * method to create cloan a bootsrap project.
     * when option object is present with replace = truen
     * will remove the project and replace it
     * @param {replace: string} options 
     */
    clone(options) {
        return new Promise((resolve, reject)=>{
            if(options && options.replace && options.replace.toString() === "true"){
                this._deleteProjectFolder()
                .then(value=>{
                    this._createProjectFolder()
                    .then(project=>{
                        resolve(project);
                    })
                    .catch(reason=>{
                        reject(reason);
                    });
                })
                .catch(reason=>{
                    reject(reason);
                });
            }else{
                this._createProjectFolder()
                .then(project=>{
                    resolve(project);
                })
                .catch(reason=>{
                    reject(reason);
                });
            }
        });
    }

    update(){
        return new Promise((resolve, reject)=>{
            child_process.exec('git pull',{
                cwd: path.join(__dirname, '../spring/daas')
            }, (error, stdout,stderr)=>{
                if(error){
                    reject({code: errCode.GIT_PULL_CODE , message: errCode.GIT_PULL_MESSAGE, error: stderr.toString()})
                }else{
                    resolve({message: stdout.toString()});
                }
            });
        });
    }

    addRemote(name, url){
        return new Promise((resolve, reject)=>{
            if(name && name !=='origin' && url){
                child_process.exec(`git remote add ${name} ${url}`,{
                    cwd: path.join(__dirname, '../spring/daas')
                }, (error, stdout, stderr)=>{
                    if(error){
                        reject({code: errCode.GIT_REMOTE_ADD_CODE , message: errCode.GIT_REMOTE_ADD_MESSAGE, error: stderr.toString()});
                    }else{
                        resolve({message: stdout.toString()})
                    }
                });
            }else{
                reject({code: errCode.GIT_REMOTE_ADD_CODE, message: errCode.GIT_REMOTE_ADD_MESSAGE, error: 'Try to add readonly remote repository'});
            }
        });
    }

    getAllRemote(){
        return new Promise((resolve, reject)=>{
            child_process.exec(`git remote -v`,{
                cwd: path.join(__dirname, '../spring/daas')
            }, (error, stdout, stderr)=>{
                if(error){
                    reject({code: errCode.GIT_REMOTE_GET_CODE , message: errCode.GIT_REMOTE_GET_MESSAGE, error: stderr.toString()});
                }else{
                    resolve({message: stdout.toString()})
                }
            });
        });
    }

    deleteRemote(name){
        return new Promise((resolve, reject)=>{
            if(name && name!=='origin'){
                child_process.exec(`git remote rm ${name}`,{
                    cwd: path.join(__dirname, '../spring/daas')
                }, (error, stdout, stderr)=>{
                    if(error){
                        reject({code: errCode.GIT_REMOTE_DELETE_CODE , message: errCode.GIT_REMOTE_DELETE_MESSAGE, error: stderr.toString()});
                    }else{
                        resolve({message: stdout.toString()})
                    }
                });
            }else{
                reject({code: errCode.GIT_REMOTE_DELETE_CODE , message: errCode.GIT_REMOTE_DELETE_MESSAGE, error: "try to delete readonly remote repository"});
            }
        });
    }

    pushRemote(name){
        return new Promise((resolve, reject)=>{
            if(name && name!=='origin'){ 
                child_process.exec('git config --global user.name="DaaS User" && git config --global user.email="user@daas.bfast.com"',{
                    cwd: path.join(__dirname, '../spring/daas')
                }, (error, stdout, stderr)=>{
                    if(error){
                        reject({code: errCode.GIT_REMOTE_PUSH_CODE, message: errCode.GIT_REMOTE_PUSH_MESSAGE, error: stderr.toString()});
                    }else{
                        child_process.exec(`git add ./src/main/ && git commit -am'${message?message:'refresh'}' && git push ${name} master`,{
                            cwd: path.join(__dirname, "../spring/daas")
                        }, (error, stdout, stderr)=>{
                            if(error){
                                reject({code: errCode.GIT_REMOTE_PUSH_CODE, message: errCode.GIT_REMOTE_PUSH_MESSAGE, error: stderr.toString()});
                            }else{
                                resolve({message: stdout.toString()});
                            }
                        });
                    }
                });
            }else{
                reject({code: errCode.GIT_REMOTE_PUSH_CODE, message: errCode.GIT_REMOTE_PUSH_MESSAGE,
                     error: "Either name or branch parameter is not included and make sure name not equal to 'origin'"});
            }
        });
    }

    pullRemote(name){
        return new Promise((resolve, reject)=>{
            process.exec(`git fetch && git pull --allow-unrelated ${name} master`,{
                cwd: path.join(__dirname, '../spring/daas')
            }, (error,stdout,stderr)=>{
                if(error){
                    reject({code: -1, message: stderr, error: error.toString()});
                }else{
                    resolve({message: stdout});
                }
            });
        });
    }

    _createProjectFolder(){
        return new Promise((resolve, reject)=>{
            child_process.exec(osP==='win32'?'.\\init.bat' : 'bash ./init.sh',{
                cwd: path.join(__dirname, '../spring/')
            },(error, stdout, stderr)=>{
                if(error){
                    reject({code: errCode.INIT_PROJECT_CODE, message: errCode.INIT_PROJECT_MESSAGE, error: stderr.toString()});
                }else{
                    resolve({message: stdout.toString()});
                }
            });
        })
    }

    _deleteProjectFolder(){
        return new Promise((resolve, reject)=>{
            child_process.exec(osP==="win32"? 'rmdir /S /Q .\\daas' : 'rm -r ./daas',{
                cwd: path.join(__dirname, '../spring')
            }, (error, stdout, stderr)=>{
                if(error){
                    reject({dode: errCode.GIT_DELETE_FOLDER_LOCAL_CODE , message: errCode.GIT_DELETE_FOLDER_LOCAL_MESSAFE, error: stderr.toString()})
                }else{
                    resolve({message: "Done delete local project folder"});
                }
            });
        })
    }

}

