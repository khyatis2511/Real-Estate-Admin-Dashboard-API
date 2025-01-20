import { Router } from 'express';
import analyticsController from './analytics.controller';

const applyAnalyticsRoutes = (app : Router) => {
  app.get('', analyticsController.getAnalytics);

  return app;
};

export default applyAnalyticsRoutes;