import UserModel from '../models/empleados.js'; // asume modelo de usuario
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { config } from '../config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser.user_email,
    pass: config.emailUser.user_pass,
  },
});

const authController = {};

// Registro
authController.register = async (req, res) => {
  try {
    const { nombre, correo, contrasenia } = req.body;
    const hashed = await bcrypt.hash(contrasenia, 10);
    const user = new UserModel({ nombre, correo, contrasenia: hashed });
    await user.save();
    res.json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
authController.login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const user = await UserModel.findOne({ correo });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id }, config.JWT.secret, { expiresIn: config.JWT.expires });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Recuperar contraseña - solicitar
authController.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await UserModel.findOne({ correo });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const token = jwt.sign({ id: user._id }, config.JWT.secret, { expiresIn: '1h' });
    const link = `${req.protocol}://${req.get('host')}/auth/reset/${token}`;
    await transporter.sendMail({
      to: correo,
      subject: 'Recuperar contraseña',
      html: `<a href="${link}">Haz clic para resetear tu contraseña</a>`,
    });
    res.json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Resetear contraseña
authController.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { contrasenia } = req.body;
    const payload = jwt.verify(token, config.JWT.secret);
    const hashed = await bcrypt.hash(contrasenia, 10);
    await UserModel.findByIdAndUpdate(payload.id, { contrasenia: hashed });
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
};

export default authController;