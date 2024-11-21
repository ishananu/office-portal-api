import Joi from 'joi';

const saveEmployeeSchma = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be at most 50 characters long.',
    'any.required': 'Name is required.'
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
  }),

  password: Joi.string().min(8).max(100).required().messages({
    'string.base': 'Password must be a string.',
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must be at most 100 characters long.',
    'any.required': 'Password is required.'
  })
});

export { saveEmployeeSchma };
