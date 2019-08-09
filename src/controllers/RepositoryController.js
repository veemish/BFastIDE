'use strict'

var file = require('fs');
var path = require('path');
var errCode = require('../erroCode');

let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';

module.exports.RepositoryController = class {

    createRepository(schema){
        return new Promise((resolve, reject)=>{
            if(!schema && !schema.name){
                reject({code: errCode.REPO_CREATE_CODE,  message: errCode.REPO_CREATE_MESSAGE});
            }else{
                let queryMethods = '';
                if(schema.queries){
                    schema.queries.forEach(query=>{
                        queryMethods = queryMethods.concat(`fun ${query.name}(${query.parameters}) : ${query.result}\n\t`);
                    });
                }
let repositoryInKotlin = `
package com.fahamutech.daas.domain

import com.fahamutech.daas.domain.*
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.data.domain.*
import java.util.*

@CrossOrigin(origins = ["*"])
interface ${schema.name}Repository : MongoRepository<${schema.name}, String>{
        ${queryMethods}
}`
                var repoPath = path.join(__dirname, `../${projectFolder}/repo/${schema.name}Repository.kt`);
                file.writeFile(repoPath, repositoryInKotlin, (err)=>{
                    if(err){
                        reject({code: errCode.SCHEMA_CREATE_CODE,  message: errCode.SCHEMA_CREATE_MESSAGE, err: err.toString()});
                    }else{
                        resolve({message: 'Schema saved'});
                    }
                });
            }
        });
    }

    updateRepository(schema){
       this.createRepository(schema);
    }

    deleteRepository(name){
        return new Promise((resolve, reject)=>{
            file.unlink(path.join(__dirname, `../${projectFolder}/repo/${name}`), (err)=>{
                if(err){
                    reject({code: errCode.REPO_DELETE_CODE, message: errCode.REPO_DELETE_MESSAGE, error: err.toString()});
                }else{
                    resolve({message:  `Repository with name  : ${name} deleted`});
                }
            })
        });
    }

    patchRepository(schema){
        this.createRepository(schema);
    }

    getRepository(name){
        return new Promise((resolve, reject)=>{
            try{
                var dFile = file.readFileSync(path.join(__dirname, `../${projectFolder}/repo/${name}`));
                resolve({repo: dFile.toString()});
            }catch(e){
                reject({code: errCode.REPO_GET_CODE , message: errCode.REPO_GET_MESSAGE, error: e});
            }
        });
    }

    getAllRepository(){
       return new Promise((resolve, reject)=>{
            try{
                var result =  file.readdirSync(path.join(__dirname,`../${projectFolder}/repo`));
                resolve({message: 'Process succeed', repos: result});
            }catch(e){
                reject({code: errCode.REPO_ALL_CODE , message: errCode.REPO_All_MESSAGE, error: e});
            }
        });
    }

}