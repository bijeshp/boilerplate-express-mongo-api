import express from 'express';
import validate from '../../utils/Validator';
import * as paramValidation from './user.validation';
import Joi from '@hapi/joi';
import * as userCtrl from './user.controller';

const router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('getting Users list');
// });

// router.post('/', function(req, res, next) {
//   res.send(req.body);
// });

router
  .route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router
  .route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
