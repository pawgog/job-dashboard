import { Router } from 'express';

import tasks from './tasks.route';

const router = Router();

router.use('/tasks', tasks);

export default router;
