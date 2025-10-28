import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbconfig.js';

export class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Usuario'
  }
}, {
  sequelize,
  modelName: 'usuario',
  tableName: 'usuario',
  timestamps: false 
});