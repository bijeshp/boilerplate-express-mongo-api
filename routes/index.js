import express from 'express';
import userRoutes from '../src/users/user.route';
import noteRoutes from '../src/notes/note.route';

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('Status-OK, Services are up and running!'));

// mount routes for other services
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

export default router;
