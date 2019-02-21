/* 
Imports
- The "mergeParams: true" enable to parse parameters true routers class
*/
  const express = require('express');
  const authRouter = express.Router({ mergeParams: true });

  // Add service
  const { sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
  const { checkFields } = require('../../services/request.checker');

  // Add controller
  const { registerUser, loginUser } = require('./auth.controller');

//

/* 
Definition 
*/
  class AuthRouterClass {

    constructor() {};

    routes(){

      // Route AUTH register user
      authRouter.post('/register', (req, res) => {
        // Check if body is present
        if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
        // Check mandatory fields
        const { miss, extra, ok } = checkFields(['pseudo', 'email', 'password', 'color'], req.body);
        // Check the result
        if (!ok) { 
          // Error
          return sendApiErrorResponse(res, 'Bad fields provided', miss, extra) 
        }
        else{
          // Success
          // Use controller
          registerUser(req.body)
          .then(
            apiRes => sendApiSuccessResponse(res, 'User is registrated', apiRes),
            // res.redirect('/home')
            console.log('test')
            )
          .catch( apiErr => sendApiErrorResponse(res, "Error during user registration", apiErr))
        }
      })


      authRouter.post( '/login', (req, res) => {
        // Error: no body present
        if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
        // Check fields in the body
        const { ok, extra, miss } = checkFields( [ 'password', 'email'], req.body )
        //=> Error: bad fields provided
        if (!ok) { 
          // Error
          return sendApiErrorResponse(res, 'Bad fields provided', miss, extra) 
        }
        else{
            // Login
            loginUser(req.body, res)
            .then(
              apiRes => sendApiSuccessResponse(res, 'User is connected', apiRes),
              // res.redirect('/home') 
              )
            .catch( apiErr => sendApiErrorResponse(res, "Error during user connection", apiErr))
        }
    })


    };

    // Initialize routes
    init(){
        this.routes();
        return authRouter;
    };

  };
//

/*
Export
*/
  module.exports = AuthRouterClass;
//