/* 
Imports 
*/
const UserModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
//

/* 
Methods 
*/
// Register new 
const registerUser = (bodyParams) => {
    return new Promise((resolve, reject) => {
        
        // Check if user already exist
        UserModel.findOne({ email: bodyParams.email }, (error, user) => {          
            if (error) { 
                return reject(error) 
            }
            else if(user){ return reject('Email already used') }

            else {
                
                // Generate a hash of the password
                bcrypt.hash(bodyParams.password, 10)

                .then( hash => { 
                    // Define user hashed password
                    const userPasswordHash = hash

                    // Save user
                    UserModel.create({
                        pseudo: bodyParams.pseudo,
                        email: bodyParams.email,
                        password: userPasswordHash,
                        color : bodyParams.color,
                        
                    }, (error, user) => {
                        // Check DDB result
                        return error ? reject(error): resolve(user)
                    });
                })
                // Catch error when hashing password
                .catch( error => reject(error)) 
            };
        });
    });
};
//


// login 
const loginUser = (bodyParams, res) => {

    return new Promise( (resolve, reject) => {
        // Search user by email
        UserModel.findOne( {email: bodyParams.email}, (error, user) =>{
            if (error) { 
                return reject(error) 
            }
            else if(!user) return reject('Unknow User') 
            
            else{
                // Check password
                const validPassword = bcrypt.compareSync(bodyParams.password, user.password);
                if( !validPassword ) {
                    reject('Password not valid')
                }
                else{
                    // Set cookie
                    res.cookie( 'chat', user.generateJwt() )
                    return resolve(user);
                };
            };
        });
    });

};

/* 
Export 
*/
module.exports = {
    registerUser,
    loginUser
};
//