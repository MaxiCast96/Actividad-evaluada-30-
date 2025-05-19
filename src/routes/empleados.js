/* src/routes/empleados.js */
import { Router } from 'express';
import empleadosController from '../controllers/empleadosController.js';

const router = Router();

// CRUD Empleados sin JWT
router.get('/',      empleadosController.getempleado);
router.post('/',     empleadosController.crearempleado);
router.put('/:id',   empleadosController.actualizarempleado);
router.delete('/:id',empleadosController.borrarempleado);

export default router;
