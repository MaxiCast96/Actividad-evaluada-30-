import empleadosModel from '../models/empleados.js';
const empleadosController = {};

empleadosController.getempleado = async (req, res) => {
  const empleados = await empleadosModel.find();
  res.json(empleados);
};

empleadosController.crearempleado = async (req, res) => {
  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
  const nuevo = new empleadosModel({ nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI });
  await nuevo.save();
  res.json({ message: 'Empleado guardado' });
};

empleadosController.borrarempleado = async (req, res) => {
  const eliminado = await empleadosModel.findByIdAndDelete(req.params.id);
  if (!eliminado) return res.status(404).json({ message: 'Empleado no encontrado :<' });
  res.json({ message: 'Empleado eliminado satisfactoriamente :D' });
};

empleadosController.actualizarempleado = async (req, res) => {
  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
  const updated = await empleadosModel.findByIdAndUpdate(
    req.params.id,
    { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Empleado no encontrado' });
  res.json({ message: 'Empleado actualizado' });
};

export default empleadosController;
