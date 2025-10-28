import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearUsuario as crearUsuarioService, findUsuarioPorNombre } from '../services/usuarioService.js';

export async function crearUsuario(req, res) {
  const { nombre, password } = req.body;
  if (!nombre || !password) {
    return res.status(400).json({ message: 'Debe completar todos los campos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await crearUsuarioService(nombre, hashedPassword, 'Usuario');

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Usuario ya existe' });
    }
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { nombre, password } = req.body;
  if (!nombre || !password) {
    return res.status(400).json({ message: 'Debe completar todos los campos' });
  }

  try {
    const dbUser = await findUsuarioPorNombre(nombre);

    if (!dbUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passOK = await bcrypt.compare(password, dbUser.password);
    if (!passOK) {
      return res.status(401).json({ message: 'Clave inválida' });
    }

    const payload = {
      usuarioID: dbUser.id,
      nombre: dbUser.nombre,
      rol: dbUser.rol
    };

    const secret = process.env.JWT_SECRET || 'contraseña';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: error.message });
  }
}