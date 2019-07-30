'use strict'

var os = require('os');
var child_process = require ('child_process');
var file = require('fs');
var process = require( 'process');
var path = require('path');
let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';

module.exports.DomainController = {
        createDomain: function(schema){
            return new Promise((resolve, reject)=>{
                if(!schema){
                    reject({code: errCode.DOMAIN_CREATE_CODE, message: "Domain schema must be present"});
                }else if(!schema.name){
                    reject({code: errCode.DOMAIN_CREATE_CODE, message: "Domain name must be present"});
                }else if(!schema.parent){
                    reject({code: errCode.DOMAIN_CREATE_CODE, message: "domain parent must be present"});
                }else if(!schema.fields){
                    reject({code: errCode.DOMAIN_CREATE_CODE, message: "domain fields must be present"});
                }else{
                    let domainFields = '\n';
                    schema.fields.forEach(element => {
                        if(element.name && element.type){
                            if(element.meta){
                                domainFields = domainFields.concat(`@${element.meta}\n`);
                            } 
                            domainFields = domainFields.concat(`var ${element.name} : ${element.type}? = ${element.default}\n`);
                        }else{
                            reject({code: errCode.DOMAIN_CREATE_CODE, message: "Domain fields data can't be determined"});
                        }
                    });
                    let domainInKotlin = `
                    package com.fahamutech.daas.domain

                    import com.fahamutech.daas.common.*
                    import org.springframework.data.annotation.*
                    
                    class ${schema.name} : ${schema.parent}(){
                        ${domainFields}
                    }`;
                    
                    try{
                        var normalPath = path.join(__dirname,`../${projectFolder}/domain/${schema.name}.kt`);
                        // console.log(normalPath);
                        let domainFile = file.writeFileSync(normalPath, domainInKotlin);
                        console.log(domainFile);
                        resolve(domainInKotlin);
                    }catch(e){
                        reject(e);
                    }
                }
            });
        },
        getDomain: function(name){
            return new Promise((resolve, reject)=>{
                resolve({message: " We prepare a domain for you"});
            });
        },
        getAllDomain: function(){
            return new Promise((resolve, reject)=>{
                try{
                    var result =  file.readdirSync(__dirname + projectFolder + '/domain');
                    resolve({message: 'Process succeed', domains: result});
                }catch(e){
                    reject({code: errCode.DOMAIN_ALL_CODE , message: errCode.DOMAIN_ALL_MESSAGE, error: e.toString()});
                }
            });
        },
        deleteDomain: function(name){
            return new Promise((resolve, reject)=>{

            });
        },
        updateDomain: function(name){
            return new Promise((resolve, reject)=>{

            });
        },
        createRepository: function(schema){
            return new Promise((resolve, reject)=>{

            });
        },
        updateRepository: function(schema){
            return new Promise((resolve, reject)=>{

            });
        },
        deleteRepository: function(schema){
            return new Promise((resolve, reject)=>{

            });
        },
        patchRepository: function(schema){
            return new Promise((resolve, reject)=>{

            });
        },
        getRepository: function(name){
            return new Promise((resolve, reject)=>{

            });
        },
        getAllRepository: function(){
            return new Promise((resolve, reject)=>{

            });
        }

}

