import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import prismaClient from '../applications/database'
import ResponseError from '../exceptions/ResponseError'
import validate from '../validations/validate'
import usersValidation from '../validations/usersValidation'
import { User } from '../../node_modules/.prisma/client/index'
import learningValidation from '../validations/learningValidation'

interface UserResponse {
  email: string
  username: string
  fullname: string
}

interface TokenUser {
  token: string
}

interface authenticationUser {
  username: string, 
  password: string
}

interface UserProfile {
  email: string
  username: string
  fullname: string
  alamat?: string | null
  role?: string | null
  profileUrl?: string | null
}

const addUsers = async (users: User): Promise<UserResponse> => {
  const userData: User = validate(usersValidation.addUsersValidation, users)

  const cekUser: number | null = await prismaClient.user.count({
    where: {
      username: userData.username
    }
  })

  if (cekUser === 1) {
    throw new ResponseError(400, 'Username atau email sudah digunakan')
  }

  userData.password = await bcrypt.hash(userData.password, 10)

  const DataUser = await prismaClient.user.create({
    data: userData,
    select: {
      email: true,
      username: true,
      fullname: true
    }
  })

  return DataUser as UserResponse
}

const authentication = async (users: authenticationUser): Promise<TokenUser> => {
    const userData: User = validate(usersValidation.loginUserValidation, users)

    const cekUser: authenticationUser | null | undefined = await prismaClient.user.findUnique({
      where: {
        username: userData.username,
      },
      select: {
        username: true,
        password: true
      }
    })

    if(cekUser === null || cekUser === undefined){
      throw new ResponseError(400, 'Username atau password salah')
    }
    console.log(cekUser.password)
    console.log(userData.password)
    const cekPassword = await bcrypt.compare(userData.password, cekUser.password)
    console.log(cekPassword);
    if(cekPassword === false){
      throw new ResponseError(404, 'Username atau Password salah')
    }

    const newToken = uuid().toString()
    const UserToken = await prismaClient.user.update({
      where: {
        username: userData.username
      },
      data: {
        token: newToken
      },
      select: {
        token: true
      }
    })

    return UserToken as TokenUser
}

const getUserByUsername = async (username: string): Promise<UserProfile> => {
  validate(usersValidation.emailorusernameValidation, username)

  const cekUser = await prismaClient.user.count({
    where: {
      username: username
    }
  })

  if(!cekUser){
    throw new ResponseError(404, 'User tidak ditemukan')
  }

  const dataUser = await prismaClient.user.findUnique({
    where: {
      username: username
    },
    select:{
      username: true,
      email: true,
      fullname: true,
      alamat: true,
      role: true,
      profileUrl: true
    }
  })

  return dataUser as UserProfile
}

const updateUser = async (userdata: UserProfile, username: string): Promise<UserProfile> => {
  const dataUser = validate(usersValidation.updateValidation, userdata)

  const updateUser = await prismaClient.user.update({
    where: {
      username: username
    },
    data: dataUser,
    select: {
      username: true,
      email: true,
      fullname: true,
      role: true,
      profileUrl: true
    }
  })

  return updateUser as UserProfile
}

const logoutUser = async (username: string): Promise<string> => {
  validate(usersValidation.emailorusernameValidation, username)

  const deleteToken = await prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true
    }
  })

  return deleteToken.username as string
}

const userGetLearning = async (useremail: string, idLearning: number) => {
  const Useremail = validate(usersValidation.emailorusernameValidation, useremail)
  const IdLearning = validate(learningValidation.idLearningpath, idLearning)

  const cekLearning = await prismaClient.learningpath.count({
    where: {
      id: IdLearning
    }
  })

  if(!cekLearning){
    throw new ResponseError(404, 'Learning Path tidak ditemukan')
  }

  const cekUserLearning = await prismaClient.userhaslearning.count({
    where: {
      useremail: Useremail,
      learningId: IdLearning
    }
  })

  if(cekUserLearning >= 1){
    throw new ResponseError(403, 'Learning path sudah diambil')
  }

  return prismaClient.userhaslearning.create({
    data: {
      useremail: Useremail,
      learningId: IdLearning
    },
    select: {
      useremail: true,
      learningId: true
    }
  })
}

const updateSkorLearningPath = async (useremail: string, idLearning: number, skor: number) => {
  const Useremail = validate(usersValidation.emailorusernameValidation, useremail)
  const IdLearning = validate(learningValidation.idLearningpath, idLearning)
  const skorUser = validate(usersValidation.skorValidation, skor)

  const cekLearning = await prismaClient.userhaslearning.findFirst({
    where: {
      useremail: Useremail,
      learningId: IdLearning
    }
  })

  if(!cekLearning){
    throw new ResponseError(404, 'Learning path tidak ada')
  }

  await prismaClient.userhaslearning.updateMany({
    where: {
      AND: [
        {
          useremail: Useremail
        },
        {
          learningId: IdLearning
        }
      ]
    },
    data: {
      skor: skorUser
    }
  })

  return "Skor telah diupdate"
}

const userAddFeedback = async (username: string, note: string) => {
  const noteFeedback = validate(usersValidation.feedbackValidation, note)
  
  return prismaClient.feedback.create({
    data: {
      note: noteFeedback,
      username: username
    },
    select: {
      username: true,
      note: true
    }
  })
}



export default { 
      addUsers, 
      authentication, 
      getUserByUsername, 
      updateUser, 
      logoutUser, 
      userGetLearning,
      updateSkorLearningPath,
      userAddFeedback
}
