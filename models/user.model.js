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
        cgu: Boolean,
    });
//

/* 
Export 
*/
    const UserModel = mongoose.model('user', UserSchema);
    module.exports = UserModel;
//