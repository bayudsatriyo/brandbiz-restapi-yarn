import express from 'express'
import Userhandler from '../handler/userhandler'

const publicRouter = express.Router()
const controlUser = new Userhandler()

publicRouter.route('/public/users').post(controlUser.registerUser)
publicRouter.route('/public/authentication').post(controlUser.authenticationHandler)

export default publicRouter
