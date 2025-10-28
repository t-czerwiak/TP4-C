import { registrarEscucha as registrarEscuchaService } from '../services/escuchaService.js';

export async function registrarEscucha(req, res) {
  const { id: cancionID } = req.body; // id de canción
  const usuarioID = req.user.usuarioID; // id de usuario desde el token

  if (!cancionID) {
    return res.status(400).json({ message: 'ID de canción requerido' });
  }

  try {
    const nuevaEscucha = await registrarEscuchaService(usuarioID, cancionID);

    res.status(201).json({ message: 'Escucha registrada', data: nuevaEscucha });
  } catch (error) {
    console.error('Error en /escucho:', error);
    if (error.name === 'SequelizeForeignKeyConstraintError') {
       return res.status(404).json({ message: 'Usuario o Canción no encontrados' });
    }
    return res.status(500).json({ message: error.message });
  }
}