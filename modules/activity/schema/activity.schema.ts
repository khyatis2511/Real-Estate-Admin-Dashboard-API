import { ActionType } from "@prisma/client";

export const activitySchema = {
  actionType: {
    isIn: {
      options: [ActionType.Download, ActionType.Login, ActionType.Logout, ActionType.PageView],
      errorMessage: 'Password is required',
    },
  },
  userId: {
    notEmpty: {
      errorMessage: 'User ID is required',
    },
  },
};
  