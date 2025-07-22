import { checkSchema } from "express-validator";

export const checkUserValidationSchema = checkSchema({
  fullName: {
    isLength: {
      options: { min: 10, max: 50 },
      errorMessage:
        "Full Name must be minumum of 10 characters and maximum of 50 characters",
    },
    notEmpty: {
      errorMessage: "Full Name cannot be empty",
    },
    isString: {
      errorMessage: "Full Name must be String",
    },
    custom: {
      options: (value) => {
        return !/<[^>]*>?/gm.test(value);
      },
      errorMessage: "Full Name cannot contain symbols or code",
    },
    escape: true,
    trim: true,
  },
  username: {
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage:
        "Must be minumum of 5 characters and maximum of 20 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    custom: {
      options: (value) => {
        return !/<[^>]*>?/gm.test(value);
      },
      errorMessage: "Username cannot contain symbols or code",
    },
    escape: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    normalizeEmail: true,
    escape: true,
    custom: {
      options: (value) => {
        return !/<[^>]*>?/gm.test(value);
      },
      errorMessage: "Email cannot contain symbols or code",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 8, max: 32 },
      errorMessage: "Password must be between 8 and 32 characters",
    },
    trim: true,
  },
});
export const loginValidationSchema = checkSchema({
  emailOrUsername: {
    notEmpty: {
      errorMessage: "Email or username cannot be empty",
    },
    isString: {
      errorMessage: "Email or username must be a string",
    },
    trim: true,
    custom: {
      options: (value) => {
        // disallow HTML or code-like symbols
        return !/<[^>]*>?/gm.test(value);
      },
      errorMessage: "Invalid characters in email or username",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    trim: true,
  },
});
