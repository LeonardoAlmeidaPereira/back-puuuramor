import express from 'express'
import mysql from 'mysql2/promise'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'

const app = express()
app.use(express.json())

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'puuuramor',
}

// Para habilitar o CORS caso o codeigniter e a api estejam rodando em servidores diferentes
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*') // Permite requisições de qualquer origem
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // Métodos permitidos
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Cabeçalhos permitidos
//     next()
// })

app.use(async (req, res, next) => {
    try {
        req.db = await mysql.createConnection(dbConfig)
        next()
    } catch (error) {
        console.error('Database connection error:', error)
        res.status(500).json({ error: 'Database connection error' })
    }
})

app.use('/', publicRoutes)
app.use('/', privateRoutes)

app.listen(3000, () => console.log("Server running on port 3000"))