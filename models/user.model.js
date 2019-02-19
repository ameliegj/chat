/* 
Imports
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//

/* 
Definition 
*/
    const UserSchema = new Schema({
        pseudo: String,
        email: String,
        password: String,
    });
//

/* 
Export 
*/
    const UserModel = mongoose.model('user', UserSchema);
    module.exports = UserModel;
//