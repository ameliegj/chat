/* 
Imports
- The "mergeParams: true" enable to parse parameters true routers class
*/
  const express = require('express');
  const chatRouter = express.Router({ mergeParams: true });

  // Add service
  const { sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
  const { checkFields } = require('../../services/request.checker');

  // Add controller
  const { saveMsg } = require('./chat.controller');
//

/* 
Definition 
*/
  class ChatRouterClass {

    constructor() {};

    routes(){

      // Route chat save msh
      chatRouter.post('/saveMsg', (req, res) => {
        // Check if body is present
        if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
        // Check mandatory fields
        const { miss, extra, ok } = checkFields(['pseudo', 'msg'], req.body);
        // Check the result
        if (!ok) { 
          // Error
          return sendApiErrorResponse(res, 'Bad fields provided', miss, extra) 
        }
        else{
          // Success
          // Use controller
          //here the controller to save in the database
          saveMsg(req.body)
          .then(
            apiRes => sendApiSuccessResponse(res, 'Message saved ', apiRes))
          .catch( apiErr => sendApiErrorResponse(res, "Error during message save", apiErr))
        }
      })


      chatRouter.get('/getOldMsg', (req, res) => {
        return saveMsg()
        // .then(
        //   apiRes => sendApiSuccessResponse(res, 'messages ok', apiRes))
        // .catch( apiErr => sendApiErrorResponse(res, "Error during messages get", apiErr))
      })

    };

    // Initialize routes
    init(){
        this.routes();
        return chatRouter;
    };

  };
//

/*
Export
*/
  module.exports = ChatRouterClass;
//