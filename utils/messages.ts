export const returnRes = (
  statusCode : number,
  message: string,
  data?: Array<unknown> | object,
) => ({
  statusCode, 
  success: (statusCode === 200 || statusCode === 201), 
  message, 
  data,
});
  
// ---- message ---- //
  
export const msgs = {
  somethingWrong: 'Something went wrong. Try again!',
  invalidPassword: 'Username or Password are incorrect.',
  registered: 'Register successfully.',
  emailExist: 'Email Already Exists!!',
  loggedIn: 'Login successfully.',
  unauthorized: 'You are unauthorized.',
  dataSent: 'Data sent successfully',
  notFound: 'Not Found!',
  logoutFailed: 'Logout failed',
  loggedOut: 'Logout successfully',
  agent : {
    create : "Agent created successfully."
  },
  analytics : {
    fetched: 'Analytics Logs fetched successfully.'
  },
  activityLogs: {
    create: "Activity Log created Successfully.",
    fetched: 'Activity Logs fetched successfully.'
  },
  user: {
    statusUpdated: 'User Status updated successfully.',
    userFetched: 'Users fetched successfully.'
  },
  jwt: {
    tokenMissing: "Token is missing.",
    tokenExpired: "Token has expired.",
    invalidToken: "Token invalid.",
    authMissing: "Authorization header is missing."
  },
  validationError: 'Validation Error',
  noAccess: 'Access denied. You do not have the necessary permissions.'
};