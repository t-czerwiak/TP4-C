import express from 'express';
import { sequelize } from './dbconfig.js'; 
import { Usuario } from './models/usuario.js';
import { Cancion } from './models/cancion.js';
import { Escucha } from './models/escucha.js';
import userRoutes from './routes/userRoutes.js';
import cancionRoutes from './routes/cancionRoutes.js';
import escuchaRoutes from './routes/escuchaRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', cancionRoutes);
app.use('/api', escuchaRoutes);

Usuario.hasMany(Escucha, { 
  as: 'escuchas',         
  foreignKey: 'usuarioId'   
});

Escucha.belongsTo(Usuario, { 
  as: 'usuario',          
  foreignKey: 'usuarioId'   
});

Cancion.hasMany(Escucha, { 
  as: 'escuchas',         
  foreignKey: 'cancionId'   
});

Escucha.belongsTo(Cancion, { 
  as: 'cancion',          
  foreignKey: 'cancionId'   
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    await sequelize.sync({ alter: true }); 
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

startServer();
