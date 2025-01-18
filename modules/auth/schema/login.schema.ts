export const loginSchema = {
  email: {
    isEmail: {
      errorMessage: 'Valid email is required',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
};
