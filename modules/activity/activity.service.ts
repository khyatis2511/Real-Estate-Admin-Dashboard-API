/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import prisma from "../../prisma/prisma.service";
import { msgs, returnRes } from "../../utils/messages";

const activityService = {
  getActivityLogsByUserId: async (req: Request) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const limit = req.params.limit ? Number(req.params.limit) : 10;
    const skip = (page - 1) * limit;
    const take = limit;
    const where = {}
    try {
      const activityLogsCount = await prisma.activityLogs.count({where});
      const activityLogsData = await prisma.activityLogs.findMany({
        skip,
        take,
        where,
      });
      if (activityLogsData) {
        const data = {
          activityLogsData,
          totalCount: activityLogsCount,
          currentPage: page,
          totalPages: Math.ceil(activityLogsCount / limit),
        };
        return returnRes(200, msgs.activityLogs.fetched, data);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  getActivityLogs: async (req: Request) => {
    console.log('comes here : ');
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    const take = limit;
    const where = {}
    try {
      const activityLogsCount = await prisma.activityLogs.count({where});
      const activityLogsData = await prisma.activityLogs.findMany({
        skip,
        take,
        where,
        include: { user: true }
      });
      if (activityLogsData) {
        const data = {
          activityLogsData,
          totalCount: activityLogsCount,
          currentPage: page,
          totalPages: Math.ceil(activityLogsCount / limit),
        };
        return returnRes(200, msgs.activityLogs.fetched, data);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  createActivityLog: async (req: Request) => {
    try {
      const activityLogData = await prisma.activityLogs.create({
        data: {
          userId: req.body.userId,
          actionType: req.body.actionType,
        }
      });
      if (activityLogData) {
          return returnRes(200, msgs.activityLogs.create);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
};

export default activityService;