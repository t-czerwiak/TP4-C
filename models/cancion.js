import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbconfig.js';

export class Cancion extends Model {}

Cancion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  }
}, {
  sequelize,
  modelName: 'cancion',
  tableName: 'cancion', 
  timestamps: false 
});