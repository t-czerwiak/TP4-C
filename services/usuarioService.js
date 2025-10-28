import { Usuario } from '../models/usuario.js';

export async function crearUsuario(nombre, password, rol) {
  return await Usuario.create({
    nombre: nombre,
    password: password, 
    rol: rol
  });
}

export async function findUsuarioPorNombre(nombre) {
  return await Usuario.findOne({
    where: { nombre: nombre }
  });
}