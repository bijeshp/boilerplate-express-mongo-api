import express from 'express';
import validate from '../../utils/Validator';
import * as paramValidation from './note.validation';
import Joi from '@hapi/joi';
import * as noteCtrl from './note.controller';

const router = express.Router();
/**
 * Notes Routes
 */
router
  .route('/')
  /** GET /api/notes - Get list of notes */
  .get(noteCtrl.list)

  /** POST /api/notes - Create new note */
  .post(validate(paramValidation.createNote), noteCtrl.create);

router
  .route('/:noteId')
  /** GET /api/notes/noteId - Get note */
  .get(noteCtrl.get)

  /** PUT /api/notes/noteId - Update note */
  .patch(validate(paramValidation.updateNote), noteCtrl.update)

  /** DELETE /api/notes/noteId - Delete note */
  .delete(noteCtrl.remove);

/** Load note when API with noteId route parameter is hit */
router.param('noteId', noteCtrl.load);

export default router;
