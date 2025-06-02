import peliculasModel from '../models/peliculas.js';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const peliculasController = {};

// Obtener todas las películas
peliculasController.getPeliculas = async (req, res) => {
  try {
    const peliculas = await peliculasModel.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener las películas', 
      error: error.message 
    });
  }
};

// Obtener película por ID
peliculasController.getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await peliculasModel.findById(id);
    
    if (!pelicula) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener la película', 
      error: error.message 
    });
  }
};

// Crear nueva película
peliculasController.crearPelicula = async (req, res) => {
  try {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    
    // Validar campos requeridos
    if (!titulo || !descripcion || !director || !genero || !anio || !duracion) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos' 
      });
    }

    let imagenUrl = '';
    
    // Subir imagen a Cloudinary si existe
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'peliculas',
          public_id: `pelicula_${Date.now()}`,
        });
        imagenUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ 
          message: 'Error al subir la imagen', 
          error: uploadError.message 
        });
      }
    }

    // Crear nueva película
    const nuevaPelicula = new peliculasModel({
      titulo,
      descripcion,
      director,
      genero,
      anio,
      duracion,
      imagen: imagenUrl
    });

    const peliculaGuardada = await nuevaPelicula.save();
    
    res.status(201).json({
      message: 'Película creada exitosamente',
      pelicula: peliculaGuardada
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear la película', 
      error: error.message 
    });
  }
};

// Actualizar película
peliculasController.actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    
    // Buscar la película existente
    const peliculaExistente = await peliculasModel.findById(id);
    if (!peliculaExistente) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    // Preparar datos de actualización
    const datosActualizacion = {
      titulo: titulo || peliculaExistente.titulo,
      descripcion: descripcion || peliculaExistente.descripcion,
      director: director || peliculaExistente.director,
      genero: genero || peliculaExistente.genero,
      anio: anio || peliculaExistente.anio,
      duracion: duracion || peliculaExistente.duracion,
    };

    // Si hay nueva imagen, subirla y eliminar la anterior
    if (req.file) {
      try {
        // Eliminar imagen anterior de Cloudinary si existe
        if (peliculaExistente.imagen) {
          const segments = peliculaExistente.imagen.split('/');
          const filename = segments[segments.length - 1].split('.')[0];
          await cloudinary.uploader.destroy(`peliculas/${filename}`);
        }

        // Subir nueva imagen
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'peliculas',
          public_id: `pelicula_${Date.now()}`,
        });
        datosActualizacion.imagen = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ 
          message: 'Error al actualizar la imagen', 
          error: uploadError.message 
        });
      }
    } else {
      // Mantener la imagen existente si no se proporciona una nueva
      datosActualizacion.imagen = peliculaExistente.imagen;
    }

    // Actualizar la película
    const peliculaActualizada = await peliculasModel.findByIdAndUpdate(
      id, 
      datosActualizacion, 
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Película actualizada exitosamente',
      pelicula: peliculaActualizada
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar la película', 
      error: error.message 
    });
  }
};

// Eliminar película (ya estaba implementado)
peliculasController.eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await peliculasModel.findByIdAndDelete(id);
    
    if (!pelicula) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    // Borrar de Cloudinary si tiene imagen
    if (pelicula.imagen) {
      try {
        const segments = pelicula.imagen.split('/');
        const filename = segments[segments.length - 1].split('.')[0];
        await cloudinary.uploader.destroy(`peliculas/${filename}`);
      } catch (cloudinaryError) {
        console.error('Error al eliminar imagen de Cloudinary:', cloudinaryError);
        // No detener el proceso si falla la eliminación de Cloudinary
      }
    }
    
    res.json({ 
      message: 'Película eliminada correctamente',
      pelicula: pelicula
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar la película', 
      error: error.message 
    });
  }
};

export default peliculasController;