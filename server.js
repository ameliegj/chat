/*
Imports and configuration
*/
  //=> Extern dependencies
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
  const ejs = require('ejs');

  //=> Express  
  const port = process.env.PORT || 8080;
  const appServer = express();

  //=> Routes
  const { mainRouter } = require('./routes/main.router');
//

/*
Server initialisation
*/
  const init = () => {
        
  //=> Body Parser
    appServer.use(bodyParser.json({limit: '10mb'}));
    appServer.use(bodyParser.urlencoded({ extended: true }));

  //=> Use path to add views
    appServer.engine( 'html', ejs.renderFile );
    appServer.set( 'view engine', 'html' );
    appServer.set( 'views', __dirname + '/www' );
    appServer.use( express.static(path.join(__dirname, 'www')) );
  //

  //=> Server mainRouter
  appServer.use('/', mainRouter);

  //=> Ready to listen
    appServer.listen(port, () => console.log('App is running on port ' + port) );
  };

  //=> Launch server
  init();
// 