import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' })
    }

    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' })
    }
}

export default authenticateToken