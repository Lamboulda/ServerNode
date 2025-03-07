import express from 'express'
import connectDB from './client/db.js'
import 'dotenv/config'
import usersRouter from './routes/usersRouter.js'
import recipesRouter from './routes/recipesRouter.js'
import authRouter from './routes/authRouter.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', usersRouter)
app.use('/api', recipesRouter)
app.use('/api', authRouter)

app.get('/', (req,res) => {
    res.end('Test')
})

connectDB();

app.listen(PORT, () => {
    console.log("server is running on port 3000")
})