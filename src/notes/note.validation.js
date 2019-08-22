import Joi from '@hapi/joi';

/**
 * Notes Validations
 */

export const createNote = {
  body: {
    text: Joi.string().required(),
    _owner: Joi.string()
      .hex()
      .required(),
  },
};

export const updateNote = {
  params: {
    noteId: Joi.string()
      .hex()
      .required(),
  },
  body: {
    ...createNote.body,
  },
};
