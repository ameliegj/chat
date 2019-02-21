isAuthenticated = (req, res, next) => {
    //do my checks here

    if (true) {
        console.log('yay')
        return next();
    } else {
        res.redirect('/');
    }    
}

module.exports = {
    isAuthenticated
};