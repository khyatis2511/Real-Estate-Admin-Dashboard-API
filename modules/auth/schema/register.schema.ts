export const registerSchema = {
  firstName: {
    notEmpty: {
      errorMessage: 'First name is required',
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: 'Last name is required',
    },
  },
  role: {
    notEmpty: {
      errorMessage: 'Role is required',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Valid email is required',
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password must be at least 8 characters long',
    },
  },
}