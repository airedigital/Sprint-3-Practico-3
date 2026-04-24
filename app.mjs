import express from 'express';
import path from 'path';
import { connectDB } from './config/dbConfig.mjs';
// Rutas para Postman
import superHeroRoutes from './routes/superHeroRoutes.mjs';
// Rutas para EJS
import superheroesRoutes from './routes/superheroesRoutes.mjs';
// importa el controlador de superhéroes
import * as superheroesController from './Controllers/superheroesController.mjs';

// crea una instancia de express
const app = express();
// define el puerto de la aplicación
const PORT = process.env.PORT || 3000;

// configura el motor de plantillas EJS
app.set('view engine', 'ejs');
// configura el directorio de las plantillas EJS
app.set('views', 'views');

// Middleware para parsear JSON y formularios HTML
app.use(express.json());
// Middleware para parsear formularios HTML
app.use(express.urlencoded({ extended: true }));

// redirige a la ruta /dashboard
app.get('/', (req, res) => {
    res.redirect(302, '/dashboard');
});

// obtiene todos los superhéroes
app.get(
    ['/dashboard', '/dashboard/'],
    superheroesController.obtenerTodosLosSuperheroesController,
);
// usa las rutas para EJS
app.use('/heroes', superheroesRoutes);

// Configuración de rutas
app.use('/api', superHeroRoutes);

// manejo de errores para rutas no encontradas
app.use((req, res) => {
res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// inicia la aplicación
async function iniciar() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}

// manejo de errores para rutas no encontradas
iniciar().catch((err) => {
    console.error('No se pudo iniciar la aplicación:', err);
    process.exit(1);
});