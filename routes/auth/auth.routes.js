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
  const { registerUser } = require('./auth.controller');

//

/* 
Definition 
*/
  class AuthRouterClass {

    constructor() {};

    routes(){

      // Route AUTH tests
      authRouter.get('/', (req, res) => {
          res.json('sdfhgjhkjlknl')
      })

      // Route AUTH register user
      authRouter.post('/register', (req, res) => {
        // Check if body is present
        if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }

        // Check mandatory fields
        const { miss, extra, ok } = checkFields(['pseudo', 'email', 'password'], req.body);

        // Check the result
        if (!ok) { 
          // Error
          return sendApiErrorResponse(res, 'Bad fields provided', miss, extra) 
        }

        else{
          // Success
          // Use controller
          registerUser(req.body)
          .then(apiRes => sendApiSuccessResponse(res, 'User is registrated', apiRes))
          .catch( apiErr => sendApiErrorResponse(res, "Error during user registration", apiErr))
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