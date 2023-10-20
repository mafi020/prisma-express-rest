import express from 'express';

import userRoute from './users.route';
import profileRoute from './profiles.route';
import postsRoute from './posts.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/profile', profileRoute);
router.use('/posts', postsRoute);

export default router;
