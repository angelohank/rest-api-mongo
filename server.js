import express from 'express'
import publicRoutes from './routes/public-routes.js'
import privateRoutes from './routes/private-routes.js'
const app = express()
app.use(express.json())

app.use('/', publicRoutes)
app.use('/', privateRoutes)

app.listen(3000, ()=> {
    console.log("servidor rodando")
})
