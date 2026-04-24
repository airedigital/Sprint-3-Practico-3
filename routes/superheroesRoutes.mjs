/**
 * Rutas bajo el prefijo `/heroes` (ver app.mjs).
 * GET  /heroes              — lista JSON
 * GET  /heroes/agregar      — formulario alta
 * POST /heroes/agregar      — alta
 * GET  /heroes/:id/editar   — formulario edición (datos precargados)
 * PUT  /heroes/:id/editar   — actualizar (JSON o clientes REST)
 * POST /heroes/:id/editar   — actualizar (envío desde formulario HTML)
 * GET  /heroes/:id/eliminar — confirmar borrado (HTML)
 * POST /heroes/:id/eliminar — ejecutar borrado (formulario) → dashboard
 * DELETE /heroes/:id        — eliminar (JSON, Postman / API)
 */
import express from 'express';
import * as heroController from '../Controllers/superheroController.mjs';
import * as superheroesController from '../Controllers/superheroesController.mjs';

// crea un router de express
const router = express.Router();

// define las rutas para los superhéroes
const mostrarFormularioAgregar = superheroesController.mostrarFormularioAgregarSuperheroe;
// define la ruta para agregar un superhéroe
const agregarSuperheroe = superheroesController.agregarSuperheroeController;
// define la ruta para editar un superhéroe
const mostrarFormularioEditar = superheroesController.mostrarFormularioEditarSuperheroe;
// define la ruta para editar un superhéroe
const editarSuperheroe = superheroesController.editarSuperheroeController;
// define la ruta para eliminar un superhéroe
const mostrarConfirmEliminar =
    superheroesController.mostrarConfirmacionEliminarSuperheroe;
// define la ruta para eliminar un superhéroe desde un formulario
const eliminarDesdeFormulario =
    superheroesController.eliminarSuperheroeFormularioController;
// define la ruta para eliminar un superhéroe
const eliminarSuperheroe = superheroesController.eliminarSuperheroeController;

// define las rutas para los superhéroes
router.get(['/agregar', '/agregar/'], mostrarFormularioAgregar);
// define la ruta para agregar un superhéroe
router.post(['/agregar', '/agregar/'], agregarSuperheroe);

// define la ruta para editar un superhéroe
router.put(['/:id/editar', '/:id/editar/'], editarSuperheroe);
// define la ruta para editar un superhéroe desde un formulario
router.get(['/:id/editar', '/:id/editar/'], mostrarFormularioEditar);
// define la ruta para editar un superhéroe desde un formulario
router.put(['/:id/editar', '/:id/editar/'], editarSuperheroe);
// define la ruta para editar un superhéroe desde un formulario
router.post(['/:id/editar', '/:id/editar/'], editarSuperheroe);

// define la ruta para eliminar un superhéroe
router.get(['/:id/eliminar', '/:id/eliminar/'], mostrarConfirmEliminar);
// define la ruta para eliminar un superhéroe desde un formulario
router.post(['/:id/eliminar', '/:id/eliminar/'], eliminarDesdeFormulario);
// define la ruta para eliminar un superhéroe
router.delete(['/:id', '/:id/'], eliminarSuperheroe);

// define la ruta para obtener todos los superhéroes
router.get('/', heroController.obtenerTodos);

// exporta el router
export default router;
