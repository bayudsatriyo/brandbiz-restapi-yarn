import validate from "../validations/validate";
import kuisValidations from "../validations/kuisValidations";
import prismaClient from "../applications/database";
import ResponseError from "../exceptions/ResponseError";
import { Kuis } from "@prisma/client";


const addKuis = async (dataKuis: Kuis) => {
    const kuisData = validate(kuisValidations.addKuisValidation, dataKuis)
    
    const cekLearning = await prismaClient.learningpath.count({
        where: {
            id: kuisData.learning_id
        }
    })

    if(!cekLearning){
        throw new ResponseError(404, 'Learning Path tidak ditemukan')
    }

    return prismaClient.kuis.create({
        data: kuisData
    })
}

const updateKuis = async (dataKuis: Kuis, id: number | undefined) => {
    const Kuisdata = validate(kuisValidations.updateKuisValidation, dataKuis)
    const idKuis = validate(kuisValidations.idKuisValidation, id)

    const cekKuis = await prismaClient.kuis.findUnique({
        where: {
            id: idKuis
        }
    })

    if(!cekKuis){
        throw new ResponseError(404, 'Kuis tidak ditemukan')
    }

    return prismaClient.kuis.update({
        where: {
            id: idKuis
        },
        data: Kuisdata,
    })
}

const deleteKuis = async (id: number) => {
    const idKuis = validate(kuisValidations.idKuisValidation, id)
    
    const cekKuis = await prismaClient.kuis.findUnique({
        where: {
            id: idKuis
        }
    })

    if(!cekKuis){
        throw new ResponseError(404, 'Kuis tidak ditemukan')
    }

    return prismaClient.kuis.delete({
        where: {
            id: idKuis
        }
    })
}

export default { addKuis, updateKuis, deleteKuis }