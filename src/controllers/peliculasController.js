import peliculasModel from '../models/peliculas.js';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const peliculasController = {};

peliculasController.getPeliculas = async (req, res) => { /*...*/ };
peliculasController.getPeliculaById = async (req, res) => { /*...*/ };
peliculasController.crearPelicula = async (req, res) => { /*... mismo que antes */ };
peliculasController.actualizarPelicula = async (req, res) => { /*...*/ };

peliculasController.eliminarPelicula = async (req, res) => {
  const { id } = req.params;
  const pelicula = await peliculasModel.findByIdAndDelete(id);
  if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
  // Borrar de Cloudinary si tiene public_id guardado (opcional)
  if (pelicula.imagen) {
    const segments = pelicula.imagen.split('/');
    const filename = segments[segments.length - 1].split('.')[0];
    await cloudinary.uploader.destroy(`peliculas/${filename}`);
  }
  res.json({ message: 'Película eliminada correctamente' });
};

export default peliculasController;