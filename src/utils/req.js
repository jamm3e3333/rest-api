const request = require('request');

const targetIP = '192.168.1.227:8008';
const taskName = 'subscriber_task';
const username = 'admin';
const password = '';
const auth = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

const getParams = (blockName,cb) => {
    request({
        "method": "GET",
        "url": `http://${targetIP}/api/tasks/${taskName}/${blockName}`,
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth
        }
    }, (error,data) => {
        if(error){
            return cb('Data not fetched',undefined);
        }
        if(data.statusCode !== 200){
            return cb('Request error',undefined);
        }
        cb(undefined,data)
    })
}

const postParams = (blockName,value,cb) => {
        request({
        "method": "POST",
        "url": `http://${targetIP}/api/tasks/${taskName}/${blockName}`,
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth
        },
        body: JSON.stringify({
            v:value
        })
    }, (error,data) => {
        if(error){
            return cb('Data not fetched',undefined);
        }
        else if(data.statusCode !== 200){
            cb('Request error',undefined);
        }
        else{
            cb(undefined,data);
        }
    })
}

module.exports = {
    getParams,
    postParams
}