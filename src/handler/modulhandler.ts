import modulService from "../services/modulService";
import { Request, Response, NextFunction } from "express";
import path from "path";
import * as fs from "fs";
import ResponseError from "../exceptions/ResponseError";

class ModulHandler {
  async addModul(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const IdLearning = parseInt(req.params.idLearning);
      const data = req.body;
      const image = `${req.format}-${req.file?.originalname}`;

      const result = await modulService.addModul(IdLearning, data, image);

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

  async getGambarMateri(
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

  async updateModulHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const idModul = parseInt(req.params.idModul);
      let image: string | null = null;
      if (req.file) {
        image = `${req.format}-${req.file?.originalname}`;
      }
      const cekModul = await modulService.getModulById(idModul);
      if (!cekModul) {
        throw new ResponseError(403, "modul tidak ditemukan");
      }
      if (cekModul.gambar && image !== null) {
        const fileName = cekModul.gambar.substring(
          cekModul.gambar.lastIndexOf("/") + 1
        );
        const filePath = path.join(__dirname, "..", "uploads", fileName);
        fs.unlinkSync(filePath);
      }
      const result = await modulService.updateModul(data, idModul, image);

      res.status(200).json({
        status: "UPDATED",
        data: result,
      });
    } catch (e) {
      if (req.file !== undefined) {
        fs.unlinkSync(req.file.path);
      }
      next(e);
    }
  }

  async deleteModulHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.idLearning);

      const result = await modulService.deleteModul(id);

      if (result) {
        if (result.gambar) {
          const fileName = result.gambar.substring(
            result.gambar.lastIndexOf("/") + 1
          );
          const filePath = path.join(__dirname, "..", "uploads", fileName);
          fs.unlinkSync(filePath);
        }
      }

      res.status(200).json({
        status: "DELETED",
        message: `modul ${result.judul} sudah terhapus`,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ModulHandler;
