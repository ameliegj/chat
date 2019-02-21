/* 
Imports
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
    const jwt = require('jsonwebtoken');
//

/* 
Definition 
*/
    const UserSchema = new Schema({
        pseudo: String,
        email: String,
        password: String,
        color: String,
        rooms: Array,
    });
//

/*
Méthode
*/
    UserSchema.methods.generateJwt = () => {
        // set expiration
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 59);

        // JWT creation
        return jwt.sign({
            _id: this._id,
            password: this.password,
            email: this.email,
            expireIn: '10s',
            exp: parseInt(expiry.getTime() / 100, 10)
        }, process.env.JWT_SECRET);
    };



/* 
Export 
*/
    const UserModel = mongoose.model('user', UserSchema);
    module.exports = UserModel;
//