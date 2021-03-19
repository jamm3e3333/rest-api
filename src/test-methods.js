const chalk = require('chalk');
const {getParams, postParams} = require('./utils/req.js');
let arr = [];

/////////////////////////////////////////////////////////////////
///GET methods
////////////////////////////////////////////////////////////////


// getParams("CNS_IN:sy",(error,data) => {
//     if(error){
//         console.log("Error while getting a string value: ");
//         console.log(error);
//     }
//     else{
//         console.log("String value: ")
//         console.log(JSON.parse(data.body).v,"\n");
//     }
// })

// getParams("CNB_IN:Y",(error,data) => {
//     if(error){
//         console.log("Error while getting a boolean value: ");
//         console.log(error);
//     }
//     else{
//         console.log("Boolean value: ");
//         console.log(chalk.magenta(JSON.parse(data.body).v === 1 ? true : false,"\n"));
//     }
// })

// getParams("CNR_IN:y", (error,data) => {
//     if(error){
//         console.log("Error while getting an real value: ");
//         console.log(error);
//     }
//     else{
//         console.log("Real value: ");
//         console.log(JSON.parse(data.body).v,"\n");
//     }
// })

// getParams("Display10:DispValue", (error,data) => {
//     if(error){
//         console.log("Error while getting a display value: ");
//         console.log(error);
//     }
//     else{
//         console.log("Dispaly value: ");
//         console.log(JSON.parse(data.body).v,"\n");
//     }
// })

/////////////////////////////////////////////////////////////////
///Post methods
////////////////////////////////////////////////////////////////

postParams("W:ycn",0.3,(error,data) => {
    // console.log(chalk.inverse.blueBright('\nPost methods: ','\n'));
    if(error){
        console.log('Error while posting the string value: ');
        return console.log(error);
    }
    console.log(data);
    
})

// postParams("CNB_IN:YCN",1, (error,data) => {
//     if(error){
//         console.log('Error while posting the boolean value: ');
//         console.log(error);
//     }
//     else{
//         console.log('Boolean value posted: ');
//         const status = JSON.parse(data.body).error;
//         console.log(`Data: ${status.message}, status code: ${status.code}`);
//     }
// })

// postParams("CNI_IN:icn", 100, (error,data) => {
//     if(error){
//         console.log('Error while posting the integer constant: ');
//         console.log(error);
//     }
//     else{
//         console.log('Integer value posted: ');
//         const status = JSON.parse(data.body).error;
//         console.log(`Data: ${status.message}, status code: ${status.code}`);
//     }
// })

// postParams("CNR_IN:ycn", 3.14159,(error,data) => {
//     if(error){
//         console.log('Error while posting the real value: ');
//     }
//     else{
//         console.log('Post value posted: ');
//         const status = JSON.parse(data.body).error;
//         console.log(`Data: ${status.message}, status code: ${status.code}`);
//     }
// })

// let value = 0;
// setInterval(() => {
//     if(!value){
//         value = 1;
//         postParams("CNB_IN:YCN",value,(error,data) =>{
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 const status = JSON.parse(data.body).error;
//                 console.log(`Data: ${status.message}, status code: ${status.code}`);
//             }
//         })
//     }
//     else{
//         value = 0;
//         postParams("CNB_IN:YCN",value,(error,data) =>{
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 const status = JSON.parse(data.body).error;
//                 console.log(`Data: ${status.message}, status code: ${status.code}`);
//             }
//         })
//     }    
// },100)