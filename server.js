/*
Imports and configuration
*/
  require('dotenv').config();
  //=> Extern dependencies
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
  const ejs = require('ejs');

  //=> Gestion des cookies
  const cookieParser = require('cookie-parser');


  //=> Connexion BDD
  const dbConnect = require('./services/mongodb.serv')

  //=> Express  
  const port = process.env.PORT || 8080;
  const appServer = express();

  //=> Routes
  const { mainRouter } = require('./routes/main.router');


/* 
Socket
*/
  var http = require('http').Server(appServer);
  var io = require('socket.io')(http);

  console.log('bonjour')

  // connexion & deconnexion
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log(msg)
      socket.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
      //call here a service to save messages
    });
  });


  io.sockets.on('connection', function (socket) {
    socket.send('hi');
  });
  
  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
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
    appServer.set( 'view engine', 'ejs' );
    appServer.set( 'views', __dirname + '/www' );
    appServer.use( express.static(path.join(__dirname, 'www')) );
  //

  //=> Server mainRouter
  appServer.use('/', mainRouter);


  //=> Cookie-parser
  appServer.use(cookieParser());

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