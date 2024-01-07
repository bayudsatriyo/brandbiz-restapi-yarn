import validate from "../validations/validate";
import modulValidations from "../validations/modulValidations";
import prismaClient from "../applications/database";
import { Modul } from "@prisma/client";
import learningValidation from "../validations/learningValidation";
import ResponseError from "../exceptions/ResponseError";


const cekJudul = async (judul: string) => {
    const cekModul = await prismaClient.modul.count({
        where: {
            judul: judul
        }
    })

    if(cekModul === 1){
        throw new ResponseError(403, 'Judul modul sudah ada, silahkan ganti judul lain')
    }
}
const addModul = async (idLearning: number | undefined, data: Modul, image: string | undefined): Promise<Modul> => {
    const dataModul = validate(modulValidations.addModulValidation, data)
    const IdLearning = validate(learningValidation.idLearningpath, idLearning)
    if(image !== undefined){
        dataModul.gambar = `http://localhost:8080/brandbiz/modul/${image}`
    }

    const cekLearning = await prismaClient.learningpath.count({
        where: {
            id: IdLearning
        }
    })

    if(!cekLearning){
        throw new ResponseError(404, 'Learning Path tidak ditemukan')
    }

    await cekJudul(dataModul.judul)

    
    const addModul = await prismaClient.modul.create({
        data: {
            judul: dataModul.judul,
            inti_materi: dataModul.inti_materi,
            tambahan: dataModul.tambahan,
            gambar: dataModul.gambar,
            video: dataModul.video,
            learning_id: IdLearning
        },
    })

    return addModul as Modul
}

const updateModul = async (data: Modul, idmodul: number, image: string | undefined) => {
    const dataModul = validate(modulValidations.addModulValidation, data)
    const idModul = validate(learningValidation.idLearningpath, idmodul)
    if(image !== undefined){
        dataModul.gambar = `http://localhost:8080/brandbiz/modul/${image}`
    }
    const cekModul = await prismaClient.modul.count({
        where: {
            id: idModul
        }
    })

    if(!cekModul){
        throw new ResponseError(404, 'id tidak ditemukan')
    }

    await cekJudul(dataModul.judul)

    return prismaClient.modul.update({
        where: {
            id: idModul
        },
        data: dataModul
    })
}

const deleteModul = async (id: number) => {
    const idModul = validate(learningValidation.idLearningpath, id)

    const cekModul = await prismaClient.modul.count({
        where: {
            id: idModul
        }
    })

    if(!cekModul){
        throw new ResponseError(404, 'id tidak ditemukan')
    }

    return prismaClient.modul.delete({
        where: {
            id: idModul
        },
        select: {
            judul: true
        }
    })
}

export default { addModul, updateModul, deleteModul }