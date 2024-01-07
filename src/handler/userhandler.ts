import userService from '../services/userService'
import { type Response, type Request, type NextFunction } from 'express'
import * as fs from 'fs'
class Userhandler {
  async registerUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = req.body
      console.log(users)

      const result = await userService.addUsers(users)

      res.status(201).json({
        status: 'CREATED',
        data: result
      })
    } catch (e) {
      next(e)
    }
  }

  async authenticationHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body
      
      const result = await userService.authentication(user)
      res.status(200).json({
        status: 'SUCCESS',
        data: result
      })
    } catch (e) {
      next(e)
    }
  }

  async getUserByUsernameHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const username = req.user.username

      const result = await userService.getUserByUsername(username)

      res.status(200).json({
        status: 'SUCCESS',
        data: result
      })
    } catch (e) {
      next(e)
    }
  }

  deleteFile = (fileName: string, extensions: Array<string>) => {
    // membuat loop untuk setiap ekstensi
    for (let ext of extensions) {
      // membuat path lengkap dari file dengan nama dan ekstensi
      let filePath = `./profile/${fileName}.${ext}`;
      // menggunakan metode fs.unlink untuk menghapus file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('gagal menghapus gambar')
        }
      });
    }
  }

  async updateUserHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dataUser = req.body
      const username = req.user.username
      let image: string
      console.log(req.file)
      if(req.file !== undefined){
        image = req.format
        dataUser.profileUrl = `http://localhost:8080/brandbiz/user/image/${image}`
      }else{
        for (let ext of ['jpg', 'png', 'jpeg']) {
          // membuat path lengkap dari file dengan nama dan ekstensi
          let filePath = `src/profile/${username}.${ext}`;
          // menggunakan metode fs.unlink untuk menghapus file
          fs.unlink(filePath, (err) => {
            if(err){
              console.log('sedang mencari')
            }
            console.log('path/file.txt was deleted');
          });
        }
        console.log('sudah dihapus')
        dataUser.profileUrl = null
      }

      console.log(dataUser)

      const result = await userService.updateUser(dataUser, username)

      res.status(200).json({
        status: 'UPDATED',
        data: result
      })
    } catch (e) {
      if(req.file !== undefined){
        fs.unlinkSync(req.file.path);
      }
      next(e)
    }
  }

  async logoutUserHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const username = req.user.username

      const result = await userService.logoutUser(username)

      res.status(200).json({
        status: 'LOGOUT',
        data: `User dengan nama ${result} sudah logout`
      })
    } catch (e) {
      next(e)
    }
  }

  async usergetlearningHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const useremail = req.user.email
        const idLearning = parseInt(req.params.idLearning)

        const result = await userService.userGetLearning(useremail, idLearning)

        res.status(200).json({
            status: 'SUCCESS',
            data: result
        })
    } catch (e) {
        next(e)
    }
  }

  async userUpdateSkor(req: Request, res: Response, next: NextFunction) {
    try {
      const useremail = req.user.email
      const idLearning = parseInt(req.params.idLearning)
      const skorUser = parseInt(req.params.skor)

      const result = await userService.updateSkorLearningPath(useremail, idLearning, skorUser)

      res.status(200).json({
        status: 'UPDATED',
        data: result
      })
    } catch (e) {
      next(e)
    }
  }

  async userAddFeedbackHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.user.username
      const note = req.body.note

      console.log(username)
      console.log(note)
      const result = await userService.userAddFeedback(username, note)

      res.status(201).json({
        status: 'SUCCESS',
        data: result
      })
    } catch (e) {
      next(e)
    }
  }
}

export default Userhandler
