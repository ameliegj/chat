/*
Imports 
- The "mergeParams: true" enable to parse parameters true routers class
*/
    const { Router } = require('express');
    const frontRouter = Router({ mergeParams: true });


    // Add controller
    const { getOldMessages } = require('../../services/getOldMessages');

//

/* 
Definition 
*/
class FrontRouterClass {

    constructor( { passport } ) {
        this.passport = passport;
        
    }

    routes(){
        // Get all paths from "/"
        frontRouter.get( ['/'], (req, res) => { 
            return res.render('index', {
                title: 'Welcome', 
                data: 'Hello EJS', 
                chat: [ {id:0, content: "hello"}, {id:1, content: "world"} ]
            }) 
        });

        frontRouter.get( ['/register'], (req, res) => { 
            return res.render('views/pages/register', {
                title: 'Sign In', 
            }) 
        });

        frontRouter.get( ['/login'], (req, res) => { 
            return res.render('views/pages/login', {
                title: 'Log In', 
            }) 
        });
        
        // frontRouter.get( ['/chat'], this.passport.authenticate('jwt', { session: false }), (req, res) => { 
        frontRouter.get( ['/chat'], (req, res) => { 
            let oldMessages = getOldMessages()
            // console.log('msg : ', oldMessages)
            return res.render('views/pages/chat', {
                title: 'Chat', 
                messages: oldMessages,
            }) 
        });
    };

    init(){
        this.routes();
        return frontRouter;
    }
}
//

/* 
Export 
*/
module.exports = FrontRouterClass;
//