import { Request, Response, Router } from 'express';
import { getTasks } from '../services/tasks.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
      const tasks = await getTasks();

      return res.status(200).json({
          result: tasks.Items,
          count: tasks.Count,
          message: "success",
      });
  } catch (err) {
      return res.status(500).json({
          result: [],
          count: 0,
          message: err,
      });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json({});
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    res.status(201).json({});
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json({});
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json({});
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json(error);
  }
});

export default router;
