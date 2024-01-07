import kuisServices from "../services/kuisServices";
import { Request, Response, NextFunction } from "express";

class KuisHandler {
    async addKuis(req: Request, res: Response, next: NextFunction) {
        try {
            const dataKuis = req.body
            dataKuis.learning_id = parseInt(dataKuis.learning_id)

            const result = await kuisServices.addKuis(dataKuis)

            res.status(201).json({
                status: 'CREATED',
                data: result
            })
        } catch (e) {
            next(e)
        }
    }

    async updateKuisByIdHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const dataKuis = req.body
            const idKuis = parseInt(req.params.id)

            console.log(dataKuis)
            console.log(idKuis)
            const result = await kuisServices.updateKuis(dataKuis, idKuis)

            res.status(200).json({
                status: 'UPDATED',
                data: result
            })
        } catch (e) {
            next(e)
        }
    }

    async deleteKuisById(req: Request, res: Response, next: NextFunction) {
        try {
            const idKuis = parseInt(req.params.id)

            await kuisServices.deleteKuis(idKuis)

            res.status(200).json({
                status: 'DELETED',
                message: 'Kuis sudah terhapus'
            })
        } catch (e) {
            next(e)
        }
    }
}

export default KuisHandler