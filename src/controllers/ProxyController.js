'use strict';

const http = require('http');

module.exports.ProxyController = class {
    daas(request, response){
        const endpoint = request.url.replace('/api','http://daas:8080');
        const daasRequest = http.request(endpoint,{
            method: request.method,
            headers: request.headers,
        },daasResponse => {
            daasResponse.pipe(response);
        });
        daasRequest.on('error', (e) => {
            console.log(e);
            response.status(503);
        });
        daasRequest.write(JSON.stringify(request.body));
        daasRequest.end();
    }

    faas(request, response){
         const endpoint = request.url.replace('/function','http://faas:3000/function');
         const faasRequest = http.request(endpoint,{
             method: request.method,
             headers: request.headers,
         },faasResponse => {
             faasResponse.pipe(response);
         });
         faasRequest.on('error', (e) => {
             console.log(e);
             response.status(503);
         });
         faasRequest.write(JSON.stringify(request.body));
         faasRequest.end();
    }
}