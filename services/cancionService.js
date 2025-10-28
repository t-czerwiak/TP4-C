import { Cancion } from '../models/cancion.js';

export async function crearCancion(nombre) {
  return await Cancion.create({ nombre });
}

export async function actualizarCancion(id, nombre) {
  const [updated] = await Cancion.update(
    { nombre: nombre },
    { where: { id: id } }
  );
  
  if (updated) {
    return await Cancion.findByPk(id);
  }
  return null; 
}

export async function eliminarCancion(id) {
  return await Cancion.destroy({
    where: { id: id }
  });
}