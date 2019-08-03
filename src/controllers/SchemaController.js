'use strict'

var file = require('fs');
var path = require('path');
var errCode = require('../erroCode');

let projectFolder = '/spring/daas/src/main/kotlin/com/fahamutech/daas';

module.exports.SchemaController = class {
    getSchema(name){
        return new Promise((resolve, reject)=>{
            file.readFile(path.join(__dirname, `../${projectFolder}/schema/${name}`), (err, data)=>{
                if(err){
                    reject({code: errCode.DOMAIN_GET_CODE , message: errCode.DOMAIN_GET_MESSAGE, error: err.toString()});
                }else{
                    // console.log(data.toString());
                    if(name==='README.md'){
                        resolve({schema: data.toString()});
                    }else{
                        resolve({schema: JSON.parse(data.toString())});
                    }
                }
            });
        });
    }

    getAllSchema(){
        return new Promise((resolve, reject)=>{
            file.readdir(path.join(__dirname,`../${projectFolder}/schema`),(error,files)=>{
                if(error){
                    reject({code: errCode.DOMAIN_ALL_CODE , message: errCode.DOMAIN_GET_MESSAGE, error: error.toString()});
                }else{
                    resolve({message: 'Process succeed', schemas: files});
                }
            });
        });
    }

    createSchema(schema){
        return new Promise((resolve, reject)=>{
            if(schema){
                var schemaPath = path.join(__dirname, `../${projectFolder}/schema/${schema.name}.js`);
                // console.log( JSON.stringify(schema));
                file.writeFile(schemaPath, JSON.stringify(schema), (err)=>{
                    if(err){
                        reject({code: errCode.SCHEMA_CREATE_CODE,  message: errCode.SCHEMA_CREATE_MESSAGE, err: err.toString()});
                    }else{
                        resolve({message: 'Schema saved'});
                    }
                });
            }else{
                reject({code: errCode.SCHEMA_CREATE_CODE,  message: errCode.SCHEMA_CREATE_MESSAGE});
            }
        });
    }

    deleteSchema(name){
        return new Promise((resolve, reject)=>{
            file.unlink(path.join(__dirname, `../${projectFolder}/schema/${name}`), (err)=>{
                if(err){
                    reject({code: errCode.SCHEMA_DELETE_CODE, message: errCode.SCHEMA_DELETE_MESSAGE, error: err.toString()});
                }else{
                    resolve({message:  `Schema with name  : ${name} deleted`});
                }
            })
        });
    }
}

