import express from 'express';
import cors from 'cors';
import profiles from './api/router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', profiles);
app.use('*', (req, res) => res.status(404).json({ error: 'not found error is from app.js' }));

export default app;