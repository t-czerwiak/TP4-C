import { Escucha } from '../models/escucha.js';

export async function registrarEscucha(usuarioID, cancionID) {
  return await Escucha.create({
    usuarioId: usuarioID,
    cancionId: cancionID 
  });
}