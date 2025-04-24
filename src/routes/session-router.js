import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport-config.js';
import { hashPassword, comparePassword } from '../utils/password-utils.js';
import User from '../daos/mongodb/models/user-model.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const hashedPassword = hashPassword(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'mi_secreto', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
});

// Ruta de validación
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  });
});

export default router;