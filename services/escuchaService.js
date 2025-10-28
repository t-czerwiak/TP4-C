import { Escucha } from '../models/escucha.js';

export async function registrarEscucha(usuarioID, cancionID) {
  return await Escucha.create({
    usuarioid: usuarioID,
    cancionid: cancionID
  });
}