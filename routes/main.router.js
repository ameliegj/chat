/* 
Imports
*/
  const { Router } = require('express');
  const FrontRouterClass = require('./front/front.routes');
  const AuthRouterClass = require('./auth/auth.routes');
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
  const frontRouter = new FrontRouterClass();
  const authRouter = new AuthRouterClass();
//

/* 
Define routes
*/
  mainRouter.use('/api/', apiRouter);
  apiRouter.use('/auth', authRouter.init());
  mainRouter.use('/', frontRouter.init());
//

/* 
Export 
*/
  module.exports = { mainRouter };
//