'use strict'

const MongoClient = require('mongodb').MongoClient;
let GitController = require('./GitController').GitController;

const gitController = new GitController();
const url = 'mongodb://mdb:27017/_BFastIde';
const client = new MongoClient(url);
// if(!client.isConnected){
client.connect();
// console.log('after connect');
// }

module.exports.DatabaseController = class {
    // getConnection(){
    //     return new Promise((resolve, reject)=>{
    //         if(client.isConnected){
    //             resolve(client.db());
    //         }else{
    //             client.connect()
    //             .then(value=>{
    //                 resolve(value.db());
    //             })
    //             .catch(reason=>{
    //                 reject(reason);
    //             });
    //         }
    //     });
    // }

    /**
     * save push informations
     * @param {name: 'gitRemote', url: string, name: string } settings 
     */
    saveGitPushSettings(settings){
        return new Promise((resolve, reject)=>{
            if(settings && settings.name && settings.url && settings.username && settings.token){
                gitController.addRemote(settings.name, settings.url, settings.username, settings.token)
                .then(async value=>{
                    // console.log(value);
                    if(settings.sId){
                        delete settings.sId;
                    }
                    settings.sId = 'gitRemote';
                    if(!client.isConnected()){
                        try{
                            await client.connect();
                        }catch(e){
                            reject({code: -1, message: 'Fail to get mdb connection', error: reason1});
                        }
                    }
                    client.db().collection('settings')
                        .updateOne({sId: 'gitRemote'},{$set: settings},{upsert: true}
                        ).then(va1=>{
                            resolve(va1);
                        }).catch(reason1=>{
                            console.log(reason1);
                            reject({code: -1, message: 'Fails to save git settings', error: reason1});
                        });
                })
                .catch(reason=>{
                    console.log(reason);
                    reject(reason);
                });
            }else{
                reject({code: -1, message: 'Settings object is required'});
            }
        });
    }

    getGitPushSettings(){
        return new Promise(async (resolve, reject)=>{
            if(!client.isConnected()){
                try{
                    await client.connect();
                }catch(e){
                    reject({code: -1, message: 'Fail to get mdb connection', error: reason1});
                }
            }
            client.db().collection('settings')
                .findOne({
                    sId: 'gitRemote'
                }).then(va1=>{
                    resolve(va1);
                }).catch(reason1=>{
                    // console.log(reason1);
                    reject({code: -1, message: 'Fail to get git settings', error: reason1});
                });
            // .then(conn=>{
                
            // }).catch(reason=>{
            //     console.log(reason);
            //     reject({code: -1, message: 'Fail to get database connection', error: reason});
            // });
        });
    }
}
