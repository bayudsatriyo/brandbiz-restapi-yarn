import express from "express";
import LearningHandler from "../handler/learninghandler";
import ModulHandler from "../handler/modulhandler";
import multer from 'multer'
import { Request } from "express";
import KuisHandler from "../handler/kuishandler";

type DestinationCallback = (error: Error | null, destination: string) => void
type FilenameCallback = (error: Error | null, filename: string) => void

declare global {
  namespace Express {
    // tambahkan properti user pada tipe Request
    interface Request {
      date: Date
      format: string
    }
  }
}

const storage = multer.diskStorage({
    destination(_req: Request, _file: Express.Multer.File, cb: DestinationCallback) {
      cb(null, 'src/uploads');
    },
    filename(req: Request,file: Express.Multer.File, cb: FilenameCallback) {
        req.date = new Date()
        req.format = req.date.toLocaleTimeString("id-ID", {hour12: false});
        cb(null, `${req.format}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage : storage });

  const learningController = new LearningHandler()
  const modulController = new ModulHandler()
  const kuisController = new KuisHandler()
  const learningRoutes = express.Router()


  // Learning Routes
  learningRoutes.route('/brandbiz/learning').post(upload.single('attachment'), learningController.addLearningHandler).get(learningController.getAllLearningPath)
  learningRoutes.route('/brandbiz/learning/:image').get(learningController.getImage)
  learningRoutes.route('/brandbiz/learning/:idLearning').delete(learningController.deleteLearningpath)
  learningRoutes.route('/brandbiz/learningpath/:idLearning').get(learningController.getLearningPathById)

  // Modul Routes
  learningRoutes.route('/brandbiz/modul/:idLearning').post(upload.single('attachment'), modulController.addModul).delete(modulController.deleteModulHandler)
  learningRoutes.route('/brandbiz/modul/:idModul').put(upload.single('attachment'), modulController.updateModulHandler)
  learningRoutes.route('/brandbiz/modul/:image').get(modulController.getGambarMateri)


  // Kuis Routes
  learningRoutes.route('/brandbiz/kuis').post(kuisController.addKuis)
  learningRoutes.route('/brandbiz/kuis/:id').put(kuisController.updateKuisByIdHandler).delete(kuisController.deleteKuisById)


  export default learningRoutes