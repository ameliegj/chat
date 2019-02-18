/*
Imports 
- The "mergeParams: true" enable to parse parameters true routers class
*/
const express = require('express');
const frontRouter = express.Router({ mergeParams: true });
//

/* 
Definition 
*/
class FrontRouterClass {

    constructor() {}

    routes(){
        // Get all paths from "/"
        frontRouter.get( ['/*'], (req, res) => { res.render('index') });
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