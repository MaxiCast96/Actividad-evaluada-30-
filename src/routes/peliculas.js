/* src/routes/peliculas.js */
import { Router } from 'express';
import peliculasController from '../controllers/peliculasController.js';
import upload from '../middlewares/upload.js';

const router = Router();

// CRUD Películas sin JWT
router.get('/',               peliculasController.getPeliculas);
router.get('/:id',            peliculasController.getPeliculaById);
router.post('/', upload.single('imagen'), peliculasController.crearPelicula);
router.put('/:id', upload.single('imagen'), peliculasController.actualizarPelicula);
router.delete('/:id',         peliculasController.eliminarPelicula);

export default router;
