/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from 'express';
import prisma from "../../prisma/prisma.service";
import jwtService from "../../services/jwt.service";
import { msgs, returnRes } from "../../utils/messages";

const authService = {
  register: async (req : Request) => {
    const { firstName, lastName, role, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return returnRes(409, msgs.emailExist);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userDetails = await prisma.user.create({
        data: { 
          email, 
          firstName, 
          lastName, 
          role,
          userHasPassword: {
            create: {
                password: hashedPassword
            }
          }  
        },
      });

      if (userDetails) {
        const { id, email } = userDetails;
        return returnRes(200, msgs.registered, { id, email });
      }

      return returnRes(400, msgs.somethingWrong);

    } catch (error: any) {
      console.error('[ register error : ]', error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  login: async (req : Request) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ 
        where: { email },
        include: { userHasPassword: true }
      });
      if (!user || user.userHasPassword.length === 0) return returnRes(401, msgs.unauthorized);

      const isMatch = await bcrypt.compare(password, user.userHasPassword[0].password);
      if (!isMatch) return returnRes(401, msgs.invalidPassword);

      const payload = { userId: user.id, role: user.role }


      const token = jwtService.generateToken({ userId: user.id, role: user.role }, '1h' );

      await prisma.activityLogs.create({
        data: {
          userId: user.id,
          actionType: ActionType.Login,
        }
      });

      return returnRes(200, msgs.loggedIn, { token, userData : {
          ...payload, firstName: user.firstName, lastName: user.lastName, email: user.email
        }
      });

    } catch (error: any) {
      console.error('[ login error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  whoAmI: async (req: Request) => {
    try {
      const userData = await prisma.user.findUnique({where: {id: req.body.id }});
      if (userData) {
        const { id, firstName, lastName, email } = userData;
        return returnRes(200, msgs.dataSent, { id, firstName, lastName, email });
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  logout: async (req: Request) => {
    const user = (req as any).user
    try {
      await prisma.activityLogs.create({
          data: {
              userId: user.userId,
              actionType: ActionType.Logout,
          }
      });

      return returnRes(200, msgs.loggedOut);
    } catch (error) {
      console.error('[ logout error : ]',error);
    }
  },
};

export default authService;