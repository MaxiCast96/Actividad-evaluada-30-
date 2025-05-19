/* src/routes/clientes.js */
import { Router } from 'express';
import clientesController from '../controllers/clientesController.js';

const router = Router();

// CRUD Clientes sin JWT
router.get('/',      clientesController.getclientes);
router.post('/',     clientesController.crearclientes);
router.put('/:id',   clientesController.actualizarclientes);
router.delete('/:id',clientesController.eliminarclientes);

export default router;
