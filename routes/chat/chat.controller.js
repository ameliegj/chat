/* 
Imports 
*/
const MsgModel = require('../../models/msg.model');
//

/* 
Methods 
*/
// POST / save new messages
const saveMsg = (bodyParams) => {
    console.log('controller save triggerred')
    return new Promise((resolve, reject) => {       
        // Save msg
        MsgModel.create({
            pseudo: bodyParams.pseudo,
            msg : bodyParams.msg,
            timestamp : Date.now()
            
        }, (error, message) => {
            // Check DDB result
            return error ? reject(error): resolve(message)
        });
    });
};
//


// GET / get last 50 messages
const getOldMsg = () => {
    console.log('controller triggerred')
    return new Promise((resolve, reject) => {       
        // Save user
        MsgModel.find((error, messages) => {
            // Check DDB result
            return error ? reject(error): resolve(messages)
        });
    });
};


/* 
Export 
*/
module.exports = {
    saveMsg,
    getOldMsg
};
//