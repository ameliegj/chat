/*
Imports and configuration
*/
  require('dotenv').config();
  //=> Extern dependencies
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
  const ejs = require('ejs');

  //=> Connexion BDD
  const dbConnect = require('./services/mongodb.serv')

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

    // Connecter la BDD
    dbConnect()
    .then( db => {
      // Start server
      appServer.listen( port, () => {
          console.log({
              monngo: `BDD is connected ${db}!`,
              server: `Server listening on port ${port}!`
          });
      });
    })
    .catch( err => console.log(`Error MongoDB ${err}`) );
  };

  //=> Launch server
  init();
// 