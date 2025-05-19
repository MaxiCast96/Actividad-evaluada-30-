import multer from 'multer';

// Carpeta local para guardar imágenes antes de subirlas a Cloudinary
const upload = multer({ dest: 'public/' });

export default upload;