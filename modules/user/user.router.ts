import { Router } from 'express';
import userController from './user.controller';

const applyUserRoutes = (app : Router) => {
  app.get('', userController.getUsers);
  app.put('', userController.updateUserStatus);
  app.get('/counts', userController.getUserCounts)

  return app;
};

export default applyUserRoutes;