import {Router} from 'express'
import { getAllUsers, createUser, getUserByID, updateUser, deleteUser } from '../controllers/userController.js'
import { VerifyUserFields } from '../middlewares/verifyUserCreation.js'

const usersRouter = Router()

usersRouter.get('/users', getAllUsers)
usersRouter.get('/users/:id', getUserByID)

usersRouter.post('/users', VerifyUserFields, createUser)

usersRouter.put('/users/:id', updateUser)

usersRouter.delete('/users/:id', deleteUser)

export default usersRouter