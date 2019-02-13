/* 
Imports
- The "mergeParams: true" enable to parse parameters true routers class
*/
  const express = require('express');
  const authRouter = express.Router({ mergeParams: true });

  // Add service
  const { sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
  const { checkfields } = require('../../services/request.checker');

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
      authRouter.post('/', (req, res) => {
        // Use service to send response
        sendApiSuccessResponse(res, 'test msg', null)
      })

      /* 
      Route AUTH register user
      */
     // TODO : register route
      // authRouter.get('register', (req, res) => {
      //   res.json('sdfhgjhkjlknl')
      // })
      // authRouter.post('register', (req, res) => {
      //   // Check if body is present
      //   if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
      //   // Check mandatory fields
      //   const { miss, extra, ok } = checkFields(['pseudo', 'firstName', 'lastName', 'email', 'password'], req.body);
      //   // Check the result
      //   if (!ok) {
      //     // error
      //     return sendFieldsError(res, 'Bad fields provided', miss, extra)
      //   } else {
      //     // success
      //     return sendApiSuccessResponse(res, 'Provided fields are ok', null)
      //   }
      // })
      //

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