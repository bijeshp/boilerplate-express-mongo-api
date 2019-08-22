import Joi from '@hapi/joi';

export const createUser = {
  body: {
    name: Joi.string().required(),
    mobileNumber: Joi.string()
      .regex(/^[1-9][0-9]{9}$/)
      .required(),
  },
};

// UPDATE /api/users/:userId
export const updateUser = {
  body: {
    name: Joi.string().required(),
    mobileNumber: Joi.string()
      .regex(/^[1-9][0-9]{9}$/)
      .required(),
  },
  params: {
    userId: Joi.string()
      .hex()
      .required(),
  },
};
