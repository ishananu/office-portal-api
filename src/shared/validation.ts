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

const updateEmployeeSchema = saveEmployeeSchma.fork(
  ['name', 'email', 'password'],
  (field) => field.optional()
);

const saveProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be at most 100 characters long.',
    'any.required': 'Name is required.'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number.',
    'number.min': 'Price must be at least 0.',
    'any.required': 'Price is required.'
  }),
  description: Joi.string().max(500).optional().messages({
    'string.base': 'Description must be a string.',
    'string.max': 'Description must be at most 500 characters long.'
  }),
  category: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Category must be a string.',
    'string.min': 'Category must be at least 3 characters long.',
    'string.max': 'Category must be at most 50 characters long.',
    'any.required': 'Category is required.'
  }),
  stock: Joi.number().min(0).optional().messages({
    'number.base': 'Stock must be a number.',
    'number.min': 'Stock must be at least 0.'
  })
});

const updateProductSchema = saveProductSchema.fork(
  ['name', 'price', 'description', 'category', 'stock'],
  (field) => field.optional()
);

const signinSchema = Joi.object({
  email: Joi.string().min(5).required().email(),
  pass: Joi.string().min(5).required()
});

const tokenSchema = Joi.object({
  token: Joi.string().min(5).required()
});

export {
  saveEmployeeSchma,
  updateEmployeeSchema,
  saveProductSchema,
  updateProductSchema,
  signinSchema,
  tokenSchema
};
