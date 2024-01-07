"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const learninghandler_1 = __importDefault(require("../handler/learninghandler"));
const modulhandler_1 = __importDefault(require("../handler/modulhandler"));
const multer_1 = __importDefault(require("multer"));
const kuishandler_1 = __importDefault(require("../handler/kuishandler"));
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, 'src/uploads');
    },
    filename(req, file, cb) {
        req.date = new Date();
        req.format = req.date.toLocaleTimeString("id-ID", { hour12: false });
        cb(null, `${req.format}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const learningController = new learninghandler_1.default();
const modulController = new modulhandler_1.default();
const kuisController = new kuishandler_1.default();
const learningRoutes = express_1.default.Router();
// Learning Routes
learningRoutes.route('/brandbiz/learning').post(upload.single('attachment'), learningController.addLearningHandler).get(learningController.getAllLearningPath);
learningRoutes.route('/brandbiz/learning/:image').get(learningController.getImage);
learningRoutes.route('/brandbiz/learning/:idLearning').delete(learningController.deleteLearningpath);
learningRoutes.route('/brandbiz/learningpath/:idLearning').get(learningController.getLearningPathById);
// Modul Routes
learningRoutes.route('/brandbiz/modul/:idLearning').post(upload.single('attachment'), modulController.addModul).delete(modulController.deleteModulHandler);
learningRoutes.route('/brandbiz/modul/:idModul').put(upload.single('attachment'), modulController.updateModulHandler);
learningRoutes.route('/brandbiz/modul/:image').get(modulController.getGambarMateri);
// Kuis Routes
learningRoutes.route('/brandbiz/kuis').post(kuisController.addKuis);
learningRoutes.route('/brandbiz/kuis/:id').put(kuisController.updateKuisByIdHandler).delete(kuisController.deleteKuisById);
exports.default = learningRoutes;
