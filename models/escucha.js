import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbconfig.js';

export class Escucha extends Model {}

Escucha.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fechaEscucha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW 
  }
  
}, {
  sequelize,
  modelName: 'escucha',
  tableName: 'escucha',
  timestamps: false 
});