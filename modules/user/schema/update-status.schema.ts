import { UserStatus } from "@prisma/client";

export const updateStatusSchema = {
  status: {
    isIn: {
      options: [UserStatus.Active, UserStatus.Banned, UserStatus.Pending],
      errorMessage: 'Password is required',
    },
  },
  userId: {
    notEmpty: {
      errorMessage: 'User ID is required',
    },
  },
};
  