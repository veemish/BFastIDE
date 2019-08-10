'use strict'

var file = require('fs');
var path = require('path');
var errCode = require('../erroCode');
var SchemaController = require('./SchemaController').SchemaController;
var RepositoryController = require('./RepositoryController').RepositoryController;

let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';
let schemaController = new SchemaController();
let repoController = new RepositoryController();

module.exports.DomainController = class {

    createDomain(schema, update){
        return new Promise((resolve, reject)=>{
            if(!schema){
                reject({code: errCode.DOMAIN_CREATE_CODE, message: "Domain schema must be present"});
            }else if(!schema.name){
                reject({code: errCode.DOMAIN_CREATE_CODE, message: "Domain name must be present"});
            }else if(!schema.parent){
                reject({code: errCode.DOMAIN_CREATE_CODE, message: "domain parent must be present"});
            }else if(!schema.fields){
                reject({code: errCode.DOMAIN_CREATE_CODE, message: "domain fields must be present"});
            }else if(!schema.queries){
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
import org.springframework.data.domain.*
import org.springframework.data.geo.*
import java.util.*

class ${schema.name} : ${schema.parent}(){
${domainFields}
}`;
                var domainPath = path.join(__dirname, `../${projectFolder}/domain/${schema.name}.kt`);
                this.getDomain(schema.name+'.kt')
                .then(_=>{
                    reject({message: 'Domain already exist, update or delete it'});
                })
                .catch(async _=>{
                    try{
                        // create schema.
                        if(update && update === true){
                            await schemaController.updateSchema(schema);
                        }else{
                            await schemaController.createSchema(schema);
                        }
                        // create a domain.
                        file.writeFileSync(domainPath, domainInKotlin);
                        // create a repository
                        await repoController.createRepository(schema);
                        resolve({domain: domainInKotlin});
                    }catch(e){
                        reject({message: e.toString()});
                    }
                });
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
        return new Promise(async (resolve, reject)=>{
            repoController.deleteRepository(`${name.toString().replace('.kt','')}Repository.kt`)
            .then(value=>{
                console.log(value);
                schemaController.deleteSchema(name.toString().replace('.kt','.js'))
                .then(schema=>{
                    console.log(schema);
                    file.unlink(path.join(__dirname, `../${projectFolder}/domain/${name}`), (err)=>{
                        if(err){
                            reject({code: errCode.DOMAIN_DELETE_CODE, message: errCode.DOMAIN_DELETE_MESSAGE, error: err.toString()});
                        }else{
                            resolve({message:  `Domain with name  : ${name} deleted`});
                        }
                    });
                })
                .catch(reason1=>{
                    reject(reason1);
                });
            })
            .catch(reason=>{
                reject(reason);
            });
        });
    }

    updateDomain(schema){
        return this.createDomain(schema, true);
    }

}

