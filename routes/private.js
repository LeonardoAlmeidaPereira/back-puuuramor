import express from 'express'
import authenticateToken  from '../middlewares/auth.js'

const router = express.Router()

router.post('/gatos', authenticateToken, async (req, res) => {
    const { name, age, breed } = req.body;
    try {
        const [result] = await req.db.query(
            'INSERT INTO cats (name, age, breed) VALUES (?, ?, ?)',
            [name, age, breed]
        );
        res.status(201).json({ id: result.insertId, name, age, breed });
    } catch (error) {
        console.error('Error creating cat:', error);
        res.status(500).json({ error: 'Error creating cat' });
    }
})

router.get('/gatos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await req.db.query('SELECT * FROM cats WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cat not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching cat:', error);
        res.status(500).json({ error: 'Error fetching cat' });
    }
})

router.put('/gatos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, age, breed } = req.body;
    try {
        const [result] = await req.db.query(
            'UPDATE cats SET name = ?, age = ?, breed = ? WHERE id = ?',
            [name, age, breed, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cat not found' });
        }
        res.status(200).json({ id, name, age, breed });
    } catch (error) {
        console.error('Error updating cat:', error);
        res.status(500).json({ error: 'Error updating cat' });
    }
})

router.delete('/gatos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await req.db.query('DELETE FROM cats WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cat not found' });
        }
        res.status(200).json({ message: 'Cat deleted successfully' });
    } catch (error) {
        console.error('Error deleting cat:', error);
        res.status(500).json({ error: 'Error deleting cat' });
    }
})

export default router