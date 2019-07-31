'use strict'

var os = require('os');
var child_process = require ('child_process');
var file = require('fs');
var path = require('path');
var errCode = require('../erroCode');
var repoController = require('./RepositoryController');

let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';

module.exports.DomainController = class {

    createDomain(schema){
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
import org.springframework.data.mongodb.core.index.*

class ${schema.name} : ${schema.parent}(){
    ${domainFields}
}`;

let repositoryInKotlin = `
package com.fahamutech.daas.domain

import com.fahamutech.daas.domain.${schema.name}
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = ["*"])
interface ${schema.name}Repository : MongoRepository<${schema.name}, String>{
}
`
                    try{
                        var domainPath = path.join(__dirname, `../${projectFolder}/domain/${schema.name}.kt`);
                        var repoPath = path.join(__dirname, `../${projectFolder}/repo/${schema.name}Repository.kt`)
                        // create a domain.
                        file.writeFileSync(domainPath, domainInKotlin);
                        // file.writeFileSync(domainPath, schema);
                        // create a repository
                        file.writeFileSync(repoPath, repositoryInKotlin);
                        resolve({domain: domainInKotlin});
                    }catch(e){
                        reject(e);
                    }
                }
            });
    }

    getDomain(name){
        return new Promise((resolve, reject)=>{
            file.readFile(path.join(__dirname, `../${projectFolder}/domain/${name}`), (err, data)=>{
                if(err){
                    reject({code: errCode.DOMAIN_GET_CODE , message: errCode.DOMAIN_GET_MESSAGE, error: err.toString()});
                }else{
                    resolve({domain: data.toString()});
                }
            });
        });
    }

    getAllDomain(){
        return new Promise((resolve, reject)=>{
            file.readdir(path.join(__dirname,`../${projectFolder}/domain`),(error,files)=>{
                if(error){
                    reject({code: errCode.DOMAIN_ALL_CODE , message: errCode.DOMAIN_GET_MESSAGE, error: error.toString()});
                }else{
                    resolve({message: 'Process succeed', domains: files});
                }
            });
        });
    }

    deleteDomain(name){
        return new Promise((resolve, reject)=>{

        });
    }

    updateDomain(name){
        return new Promise((resolve, reject)=>{

        });
    }

}

