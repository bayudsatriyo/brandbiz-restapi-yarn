import validate from "../validations/validate";
import learningValidation from "../validations/learningValidation";
import prismaClient from "../applications/database";
import { Learningpath } from "@prisma/client";
import ResponseError from "../exceptions/ResponseError";

export interface learningpath {
  judul: string;
  imageUrl?: string;
}

const addLearning = async (data: learningpath, format: string) => {
  const dataLearning = validate(learningValidation.addLearningValidation, data);

  // const fileData = validate(learningValidation.addLearningValidation, filename)
  const cekJudul = await prismaClient.learningpath.findUnique({
    where: {
      judul: dataLearning.judul,
    },
  });

  if (cekJudul) {
    throw new ResponseError(400, "Judul sudah ada, silahkan ganti judul lain");
  }
  const urlImage = `/brandbiz/learning/${format}-${dataLearning.imageUrl}`;
  const Learningdata = await prismaClient.learningpath.create({
    data: {
      judul: dataLearning.judul,
      imageUrl: `${process.env.BASE_URL}/brandbiz/learning/${format}-${dataLearning.imageUrl}`,
    },
  });

  return { ...Learningdata, urlImage };
};

const getAllLearningpath = async (): Promise<Learningpath[]> => {
  const dataLearningPath = await prismaClient.learningpath.findMany();

  return dataLearningPath;
};

const getLarningPathById = async (id: number) => {
  const idLearning = validate(learningValidation.idLearningpath, id);

  const cekLearning = await prismaClient.learningpath.count({
    where: {
      id: idLearning,
    },
  });

  if (!cekLearning) {
    throw new ResponseError(404, "Learning path tidak ditemukan");
  }

  return prismaClient.learningpath.findUnique({
    where: {
      id: idLearning,
    },
    select: {
      id: true,
      judul: true,
      imageUrl: true,
      modul: true,
      kuis: true,
    },
  });
};

const deleteLearningPath = async (id: number) => {
  const idlearning = validate(learningValidation.idLearningpath, id);

  const judul = await prismaClient.learningpath.delete({
    where: {
      id: idlearning,
    },
    select: {
      judul: true,
      imageUrl: true,
    },
  });

  return judul;
};

export default {
  addLearning,
  getAllLearningpath,
  deleteLearningPath,
  getLarningPathById,
};
