/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import prisma from "../../prisma/prisma.service";
import { msgs, returnRes } from "../../utils/messages";
import { ActionType } from '@prisma/client';

const analyticsService = {
  getAnalytics: async (req: Request) => {
    try {
      console.log(req.query);
      const dau = await prisma.activityLogs.groupBy({
        by: ['userId'],
        where: {
          activityAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 1)), // DAU
          },
        },
      });
    
      const wau = await prisma.activityLogs.groupBy({
        by: ['userId'],
        where: {
          activityAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)), // WAU
          },
        },
      });
    
      const pageViews = await prisma.activityLogs.count({
        where: {
          actionType: ActionType.PageView,
        },
      });
      if (dau || wau || pageViews) {
        const data = {
          DAU: dau.length,
          WAU: wau.length,
          pageViews,
        };
        return returnRes(200, msgs.analytics.fetched, data);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  }
};

export default analyticsService;
