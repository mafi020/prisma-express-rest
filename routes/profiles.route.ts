import express, { NextFunction, Request, Response } from 'express';

import { prisma } from '../configs/db.config';

const router = express.Router();

// router.get(
//   '/',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await prisma.user.findMany();
//       res.status(200).json({ success: true, users });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ success: false, err });
//     }
//   }
// );
// router.post(
//   '/',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = await prisma.user.create({
//         data: req.body,
//       });
//       res.status(201).json({ success: true, user });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ success: false, err });
//     }
//   }
// );

export default router;
