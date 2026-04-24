/**
 * Rutas para Postman
*/
// importa express
import express from 'express';
// importa el controlador de superhéroes
import * as heroController from '../Controllers/superheroController.mjs';

// crea un router de express
const router = express.Router();

// define las rutas para los superhéroes
router.get('/mayores-30', heroController.obtenerMayoresDe30);
// define la ruta para obtener un superhéroe por su id
router.get('/id/:id', heroController.obtenerPorId);

// define la ruta para buscar un superhéroe por un atributo y un valor
router.get(
    '/buscar-atributo/:atributo/:valor',
    heroController.buscarPorAtributo,
);
// define la ruta para buscar un superhéroe por su planeta de origen
router.get('/buscar', heroController.buscarPorPlaneta);
// define la ruta para obtener todos los superhéroes
router.get('/', heroController.obtenerTodos);

// define la ruta para obtener un superhéroe por su nombre
router.get('/:nombre', heroController.obtenerPorNombre);
// define la ruta para crear un nuevo superhéroe
router.post('/', heroController.insertar);
// define la ruta para actualizar un superhéroe por su nombre
router.put('/:nombre', heroController.actualizar);
// define la ruta para eliminar un superhéroe por su nombre
router.delete('/:nombre', heroController.eliminar);
// define la ruta para eliminar un superhéroe por su id
router.delete('/id/:id', heroController.eliminarPorId);

// exporta el router
export default router;
