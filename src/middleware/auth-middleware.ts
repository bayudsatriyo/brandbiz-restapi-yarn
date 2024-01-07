import prismaClient from "../applications/database";
import { Request, Response, NextFunction } from "express";
import { User } from "../../node_modules/.prisma/client/index";

// deklarasikan namespace global Express
declare global {
    namespace Express {
      // tambahkan properti user pada tipe Request
      interface Request {
        user: User
      }
    }
  }

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');
    if (!token) {
      res.status(401).json({
        errors: 'Unauthorized',
      }).end();
    } else {
      const user = await prismaClient.user.findFirst({
        where: {
          token,
        },
        select: {
          email: true,
          username: true,
          fullname: true,
          password: true,
          alamat: true,
          role: true,
          profileUrl: true,
        },
      });
      if (!user) {
        res.status(401).json({
          errors: 'Unauthorized',
        }).end();
      } else {
        req.user = user as User;
        next();
      }
    }
  };
  