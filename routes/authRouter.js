import { Router } from "express"
import bcrypt from 'bcrypt'
import { VerifyUserFields } from "../middlewares/verifyUserCreation.js"
import User from "../models/user.js"

const authRouter = Router()

authRouter.post('/register', VerifyUserFields, async (req,res) => {
    const {first_name, last_name, email, password} = req.body
    try {
            const emailVerification = await User.findOne({email})
            if (!emailVerification) {
              return res.status(409).json({ message: 'Email already taken' });
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const newUser = new User({
                first_name,
                last_name,
                email,
                password : hashedPassword
            })
            newUser.save()
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }
})

export default authRouter