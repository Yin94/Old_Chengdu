import Joi from 'joi';

export const loginSchema = {
  email: Joi.string()
    .email()
    .max(50)
    .required()
    .error(() => {
      const err = new Error(
        'Not a valid email address, or exceed 50 characters.'
      );
      err.origin = 'email';
      return err;
    }),
  password: Joi.string()
    .regex(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=.,`]).*$/)
    .min(6)
    .max(40)
    .required()
    .error(() => {
      const err = new Error(
        'Password must between 6 and 20 characters, must contain at least one alphabet one numberic and one special character of "@#$%^&+=.,`"'
      );
      err.origin = 'password';
      return err;
    })
};

export const signupSchema = {
  ...loginSchema,
  confirmPassword: Joi.ref('password'),
  userName: Joi.string()
    .min(5)
    .max(20)
    .required()
    .error(() => {
      const err = new Error('Username must between 5 and 20 characters.');
      err.origin = 'userName';
      return err;
    })
};
