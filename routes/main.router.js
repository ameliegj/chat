/* 
Imports
*/
  const { Router } = require('express');
  const FrontRouterClass = require('./front/front.routes');
  const AuthRouterClass = require('./auth/auth.routes');
  const ChatRouterClass = require('./chat/chat.routes');
//

/* 
Passport Strategy
Passport est un module NPM qui permet de sécuriser les connexions utilisateur grâce à des stratégies spécifiques. Nous utilisons ici la startégie JWT (cf. setAuthentication)
*/
const passport = require('passport');
const { setAuthentication } = require('../services/authentication');
setAuthentication(passport);
//

/* 
Define globale routers
*/
  const mainRouter = Router();
  const apiRouter = Router();
//

/*
Define specific routers
*/
  const frontRouter = new FrontRouterClass({ passport });
  const authRouter = new AuthRouterClass();
  const chatRouter = new ChatRouterClass();
//

/* 
Define routes
*/
  mainRouter.use('/', frontRouter.init());
  mainRouter.use('/api/', apiRouter);

  apiRouter.use('/auth', authRouter.init());
  apiRouter.use('/chat', chatRouter.init());
//

/* 
Export 
*/
  module.exports = { mainRouter };
//