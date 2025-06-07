import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = express.Router()

const app = express()

router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        
        await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hash,
            }
        })

        res.status(201).json(user)
    } catch(err) {
        res.status(500).json({message: err})
    }
    
})

export default router