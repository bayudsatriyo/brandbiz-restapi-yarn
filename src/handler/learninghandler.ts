import learningService, { learningpath } from "../services/learningService";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

import path from "path";
import { type Response, type Request, type NextFunction } from "express";
import * as fs from "fs";

class LearningHandler {
  async addLearningHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { judul } = req.body;
      const filename = req.file;

      const dataLearning: learningpath = {
        judul: judul,
      };

      if (filename?.originalname !== undefined) {
        dataLearning.imageUrl = filename.originalname;
      }

      const result = await learningService.addLearning(
        dataLearning,
        req.format
      );

      res.status(201).json({
        status: "CREATED",
        data: result,
      });
    } catch (e) {
      if (req.file !== undefined) {
        fs.unlinkSync(req.file.path);
      }
      next(e);
    }
  }

  async getImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const image = req.params.image;
      // const __dirname = dirname();

      const filePath = path.join(__dirname, "..", "uploads", image);
      res.sendFile(filePath);
    } catch (e) {
      next(e);
    }
  }

  async getAllLearningPath(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dataLearning = await learningService.getAllLearningpath();

      res.status(200).json({
        data: dataLearning,
      });
    } catch (e) {
      next(e);
    }
  }

  async getLearningPathById(req: Request, res: Response, next: NextFunction) {
    try {
      const idLearningPath = parseInt(req.params.idLearning);

      const result = await learningService.getLarningPathById(idLearningPath);

      res.status(200).json({
        status: "SUCCESS",
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteLearningpath(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.idLearning);

      const judul = await learningService.deleteLearningPath(id);

      if (judul) {
        if (judul.imageUrl) {
          const fileName = judul.imageUrl.substring(
            judul.imageUrl.lastIndexOf("/") + 1
          );
          const filePath = path.join(__dirname, "..", "uploads", fileName);
          fs.unlinkSync(filePath);
        }
      }

      res.status(200).json({
        status: "DELETED",
        message: `Learning path ${judul.judul} telah dihapus`,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default LearningHandler;
