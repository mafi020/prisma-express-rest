import express, { NextFunction, Request, Response } from 'express';

import { prisma } from '../configs/db.config';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: { id: +id },
      include: {
        // Include the posts for this user
        // posts: true,

        // Include posts, filter by published, select id, title, content; skip 1, limit 1
        posts: {
          where: {
            published: false,
          },
          select: {
            id: true,
            title: true,
            content: true,
          },
          // skip: 1,
          // take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, user: {} });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id: +id },
      data: req.body,
    });
    if (!user) {
      return res.status(500).json({ success: false });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: +id },
      });
      res
        .status(200)
        .json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, err });
    }
  }
);

export default router;
