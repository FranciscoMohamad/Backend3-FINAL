import express from 'express';
import jwt from 'jsonwebtoken';
import { transporter } from '../utils/mailer.js';
import passport from '../config/passport-config.js';
import { hashPassword, comparePassword } from '../utils/password-utils.js';
import User from '../daos/mongodb/models/user-model.js';
import { UserDTO } from '../dtos/user.dto.js';

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

    // Devuelve el DTO (sin password)
    res.status(201).json({ message: 'Usuario registrado', user: new UserDTO(user) });
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

// Ruta de validación con DTO
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(new UserDTO(req.user));
});

// Solicitud de recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<p>Haz click en el siguiente botón para restablecer tu contraseña:</p>
           <a href="${resetLink}"><button>Restablecer contraseña</button></a>`
  });

  res.json({ message: 'Correo de recuperación enviado' });
});

// Restablecimiento de contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (comparePassword(newPassword, user.password)) {
      return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    user.password = hashPassword(newPassword);
    await user.save();

    res.json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Enlace inválido o expirado' });
  }
});

export default router;