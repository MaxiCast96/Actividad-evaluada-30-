import express from 'express';
import mongoose from 'mongoose';
import { config } from './src/config.js';
import authRoutes from './src/routes/auth.js';
import peliculasRoutes from './src/routes/peliculas.js';
import clientesRoutes from './src/routes/clientes.js';
import empleadosRoutes from './src/routes/empleados.js';

const app = express();
app.use(express.json());


// Rutas
app.use('/auth', authRoutes);
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/empleados', empleadosRoutes);

export default app;