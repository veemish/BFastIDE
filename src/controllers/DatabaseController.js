'use strict'

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://mdb:27017/_BFastIde';
const client = new MongoClient(url);
// if(!client.isConnected){
    client.connect({useNewUrlParser: true });
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
            if(settings && settings.name && settings.url){
                if(settings.sId){
                    delete settings.sId;
                }
                settings.sId = 'gitRemote';
                client.db().collection('settings')
                    .updateOne(
                        {
                            sId: 'gitRemote'
                        },
                        settings,
                        {
                            upsert: true
                        }
                    ).then(va1=>{
                        resolve(va1);
                    }).catch(reason1=>{
                        reject({code: -1, message: 'Fails to save git settings', error: reason1});
                    });
                // client.connect()
                // .then(conn=>{
                    
                // }).catch(reason=>{
                //     reject({code: -1, message: 'Fail to get database connection', error: reason});
                // });
            }else{
                reject({code: -1, message: 'Settings object is required'});
            }
        });
    }

    getGitPushSettings(){
        return new Promise((resolve, reject)=>{
            client.db().collection('settings')
                .findOne({
                    sId: 'gitRemote'
                }).then(va1=>{
                    resolve(va1);
                }).catch(reason1=>{
                    console.log(reason1);
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
