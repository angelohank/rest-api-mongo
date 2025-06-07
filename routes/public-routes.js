import express from 'express'

const app = express()
const router = express.Router()

router.post('/cadastro', (req, res) => {
    const user = req.body

    res.status(201).json(user)
})

export default router