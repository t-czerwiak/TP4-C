import { crearCancion as crearCancionService,
        actualizarCancion as actualizarCancionService,
        eliminarCancion as eliminarCancionService } from '../services/cancionService.js';

export async function crearCancion(req, res) {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: 'Nombre requerido' });
  }

  try {
    const nuevaCancion = await crearCancionService(nombre);
    res.status(201).json({ message: 'Canción creada', data: nuevaCancion });
  } catch (error) {
    console.error('Error al crear canción:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Canción ya existe' });
    }
    return res.status(500).json({ message: error.message });
  }
}

export async function actualizarCancion(req, res) {
  const { id, nombre } = req.body;
  if (!id || !nombre) {
    return res.status(400).json({ message: 'ID y nombre requeridos' });
  }

  try {
    const cancionActualizada = await actualizarCancionService(id, nombre);

    if (!cancionActualizada) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json({ message: 'Canción actualizada', data: cancionActualizada });
  } catch (error) {
    console.error('Error al actualizar canción:', error);
    return res.status(500).json({ message: error.message });
  }
}

export async function eliminarCancion(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'ID requerido' });
  }

  try {
    const numEliminadas = await eliminarCancionService(id);

    if (numEliminadas === 0) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json({ message: 'Canción eliminada' });
  } catch (error) {
    console.error('Error al eliminar canción:', error);
    return res.status(500).json({ message: error.message });
  }
}