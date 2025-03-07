import User from '../models/user.js'

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select('-password')
        if(!users.length < 1){
            return res.status(400).json({message: 'Users not found'})
        }
        return res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const getUserByID = async (req,res) => {
    const {id} = req.params
    try{
        const userByID = await User.findById(id)
        if(!userByID){
            return res.status(400).json({message: 'User not found'})
        }
        return req.status(201).json(userByID)

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }
}

export const createUser = async (req,res) => {
    const {first_name, last_name, email, password} = req.body
    try{
        const newUser = await User.create(req.body)
        return req.status(201).json(newUser)

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const updateUser = async (req,res) => {
    const{id} = req.params
    const {first_name, last_name, email, password} = req.body
    try{
        const userByID = await User.findByIdAndUpdate(id, req.body, {new : true})
        userByID.save()
        return res.json(userByID)

    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}

export const deleteUser = async (req,res) => {
    const{id} = req.params
    try{
        const deletedUser = User.findByIdAndDelete(id)
        if(deletedUser){
            return res.status(204).json({message: 'User has been deleted'})
        }
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }

}