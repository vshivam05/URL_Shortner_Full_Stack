
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
