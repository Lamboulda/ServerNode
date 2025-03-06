

export const VerifyUserFields =(req, res, next) => {
    try{
        const {first_name, last_name, email, password} = req.body
        if(!first_name || !last_name || email || password){
            return res.json('All fields are required')
        }
    }
    catch(err){
        return res.status(500).json({message: 'Internal server error'})
    }
}