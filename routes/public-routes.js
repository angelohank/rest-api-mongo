import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()

const jwt_secret = process.env.JWT_SECRET

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
        res.status(500).json({message: "Erro no servidor, tente novamente"})
    }
    
})

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body

        const user = await prisma.user.findUnique({
            where: { email: userInfo.email }, 
        })

        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        if(!isMatch) {
            return res.status(401).json({message: "Senha incorreta"}) 
        }

        //define por quanto tempo o token tera validade
        const token = jwt.sign({id: user.id}, jwt_secret, {expiresIn: '1m'})
        res.status(200).json(token)

    } catch(err) {
        res.status(500).json({message: "Erro no servidor, tente novamente"})
    }
    
})

export default router