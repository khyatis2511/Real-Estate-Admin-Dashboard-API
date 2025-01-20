import { Router } from 'express';
import activityController from './activity.controller';

const applyActivityRoutes = (app : Router) => {
  app.get('/user/:id', activityController.getActivityLogsByUserId);
  app.get('', activityController.getActivityLogs);
  app.post('', activityController.createActivityLog);

  return app;
};

export default applyActivityRoutes;