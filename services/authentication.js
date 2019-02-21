/*
Imports
*/
    const JwtStrategy = require('passport-jwt').Strategy;
    const UserModel = require('../models/user.model');
//

/*
Service definition
*/  


// Extract token from cookie

// var cookieExtractor = function(req) {
//     var token = null;
//     if (req && req.cookies)
//     {
//         console.log('truuuuueeee')
//         token = req.cookies['chat'];
//     } else {
//         console.log('faaalse')
//     }
//     return token;
// };
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['hetic-chat'];
    return token;
};

// JWT authentication
const authJwt = (passport) => {
    // #JWT Options for passport
    const opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
    };
    // console.log(opts)
    // console.log('authJWD + passport : ', passport)
    // #JWT strategy
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
            if (err) { return done(err, false)}
            if (user) { 
                return done(null, user) 
            }
            else { return done(null, false) }
        });
    }));
};
// 


/*
Export service
*/
module.exports = {
    setAuthentication: (passport) => {
        authJwt(passport);
    },
};
// 