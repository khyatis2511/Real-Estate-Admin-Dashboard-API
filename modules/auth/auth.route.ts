import { Router } from 'express';
import authController from './auth.controller';
import checkAuth from '../../middlewares/checkAuth.middleware';

const applyAuthRoutes = (app : Router) => {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
  app.get('/who-am-i', checkAuth, authController.whoAmI);
  app.post('/logout', checkAuth, authController.logout);

  return app;
};

export default applyAuthRoutes;