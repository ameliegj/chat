/* 
Imports
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
    // const jwt = require('jsonwebtoken');
//

/* 
Definition 
*/
    const MsgSchema = new Schema({
        pseudo: String,
        msg: String,
        timestamp: Date
    });
//

/*
Méthode
*/

/* 
Export 
*/
    const MsgModel = mongoose.model('msg', MsgSchema);
    module.exports = MsgModel;
//