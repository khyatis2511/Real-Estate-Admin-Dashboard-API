/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import prisma from "../../prisma/prisma.service";
import { msgs, returnRes } from "../../utils/messages";
import { UserStatus } from '@prisma/client';

const userService = {
  getUsers: async (req: Request) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    const take = limit;
    try {
      const filter: any = { isDeleted: false }
      if(req.query.status) {
        filter['status'] = req.query.status
      }
      const userCount = await prisma.user.count({
        where: filter,
      });
      const users = await prisma.user.findMany({
        skip,
        take,
        where: filter,
      });
      if (users) {
        const data = {
          userData: users,
          totalCount: userCount,
          currentPage: page,
          totalPages: Math.ceil(userCount / limit),
        };
        return returnRes(200, msgs.user.userFetched, data);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  updateUserStatus: async (req: Request) => {
    const user = (req as any).user
    try {
      const userData = await prisma.user.findUnique({where: {id: req.body.userId}});
      if (userData) {
        const updatedUserData = await prisma.user.update({
          where: { id: req.body.userId },
          data: { status: req.body.status, updateBy: user.userId, updatedAt: new Date() }
        });

        if(updatedUserData) {
          return returnRes(200, msgs.user.statusUpdated);
        }
        return returnRes(400, msgs.somethingWrong);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  getUserCounts: async (req: Request) => {
    try {
      console.log(req.query);
      const filter = { isDeleted: false }
      const newUserCount = await prisma.user.count({
        where: {
          ...filter,
          status: UserStatus.Pending
        },
      });
      const existingUserCount = await prisma.user.count({
        where: {
          ...filter,
          status: UserStatus.Active
        },
      });
      const totalUserCount = await prisma.user.count({
        where: {
          ...filter,
        },
      });
      if (existingUserCount || newUserCount || totalUserCount) {
        const data = {
          newUserCount,
          existingUserCount,
          totalUserCount,
        };
        return returnRes(200, msgs.user.userFetched, data);
      }
      return returnRes(400, msgs.notFound);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  }
};

export default userService;