import express from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    //Alterar para uma verificação real de usuário e senha
    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' })
        return res.status(200).json({ token })
    }

    res.status(401).json({ error: 'Invalid credentials' })
})

router.get('/gatos', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM cats');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cats:', error);
        res.status(500).json({ error: 'Error fetching cats' });
    }
})

export default router