/**
 * Controlador de vistas web (formularios EJS).
 * MVC: solo HTTP + render/redirect; el listado pasa por el servicio y la forma de vista por responseView.
 */
// importa el servicio de superhéroes
import * as superheroesService from '../services/SuperheroesService.mjs';
import { renderizarListaSuperheroes } from '../Views/responseView.mjs';

/** Obtiene todos los superhéroes */
export async function obtenerTodosLosSuperheroesController(req, res) {
    // intenta obtener todos los superhéroes
    try {
        const resultado = await superheroesService.listarTodosLosSuperheroes();
        // si hay un error, devuelve un mensaje de error
        if (!resultado.ok) {
            return res.status(500).send('Error al cargar el listado');
        }
        // renderiza la lista de superhéroes
        const heroes = renderizarListaSuperheroes(resultado.documentos);
        // renderiza la página de dashboard
        return res.render('dashboard', {
            titulo: 'Superhéroes',
            heroes,
        });
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).send('Error al cargar el dashboard');
    }
}

/** Muestra el formulario para agregar un superhéroe */
export async function mostrarFormularioAgregarSuperheroe(req, res) {
    // intenta mostrar el formulario para agregar un superhéroe
    try {
        // renderiza el formulario para agregar un superhéroe
        res.render('addSuperhero', {
            titulo: 'Agregar superhéroe',
            errores: [],
            valores: {},
        });
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).send('Error al mostrar el formulario');
    }
}

/** Agrega un superhéroe */
export async function agregarSuperheroeController(req, res) {
    // intenta agregar un superhéroe
    try {
        // crea un nuevo superhéroe
        const resultado = await superheroesService.crearSuperheroeDesdeBody(req.body);
        // si hay un error, devuelve un mensaje de error
        if (!resultado.ok) {
            // si hay un error, devuelve un mensaje de error
            return res.status(400).render('addSuperhero', {
                titulo: 'Agregar superhéroe',
                errores: resultado.errores,
                valores: req.body,
            });
        }
        // redirige a la página de dashboard
        return res.redirect(303, '/dashboard');
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return res.status(500).render('addSuperhero', {
            titulo: 'Agregar superhéroe',
            errores: ['Error inesperado al guardar'],
            valores: req.body || {},
        });
    }
}

/** Muestra el formulario para editar un superhéroe */
export async function mostrarFormularioEditarSuperheroe(req, res) {
    // intenta mostrar el formulario para editar un superhéroe
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // obtiene el superhéroe para el formulario de edición
        const resultado =
            await superheroesService.obtenerSuperheroeParaFormularioEdicion(id);
        // si hay un error, devuelve un mensaje de error
        if (!resultado.ok) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            if (resultado.notFound) {
                return res.status(404).send('Superhéroe no encontrado');
            }
            // si la solicitud es inválida, devuelve un mensaje de error
            return res
                .status(400)
                .send((resultado.errores || ['Solicitud inválida']).join(' '));
        }
        // renderiza el formulario para editar un superhéroe
        return res.render('editSuperhero', {
            titulo: 'Editar superhéroe',
            idHeroe: id,
            errores: [],
            valores: resultado.valores,
        });
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).send('Error al cargar el formulario de edición');
    }
}

export async function editarSuperheroeController(req, res) {
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // actualiza el superhéroe desde el body
        const resultado =
            await superheroesService.actualizarSuperheroePorIdDesdeBody(id, req.body);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (resultado.notFound) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res.status(404).send('Superhéroe no encontrado');
        }
        // si la solicitud es inválida, devuelve un mensaje de error
        if (!resultado.ok) {
            // si la solicitud es inválida, devuelve un mensaje de error
            return res.status(400).render('editSuperhero', {
                titulo: 'Editar superhéroe',
                idHeroe: id,
                errores: resultado.errores,
                valores: req.body || {},
            });
        }
        // redirige a la página de dashboard
        return res.redirect(303, '/dashboard');
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return res.status(500).render('editSuperhero', {
            titulo: 'Editar superhéroe',
            idHeroe: req.params.id,
            errores: ['Error inesperado al guardar'],
            valores: req.body || {},
        });
    }
}

/** Pantalla de confirmación (solo HTML, sin JavaScript). */
export async function mostrarConfirmacionEliminarSuperheroe(req, res) {
    // intenta mostrar la confirmación para eliminar un superhéroe
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // obtiene el superhéroe para el formulario de eliminación
        const resultado =
            await superheroesService.obtenerSuperheroeParaFormularioEdicion(id);
        // si hay un error, devuelve un mensaje de error
        if (!resultado.ok) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            if (resultado.notFound) {
                return res.status(404).send('Superhéroe no encontrado');
            }
            // si la solicitud es inválida, devuelve un mensaje de error
            return res
                .status(400)
                .send((resultado.errores || ['Solicitud inválida']).join(' '));
        }
        // obtiene el nombre del superhéroe
        const nombre =
            resultado.valores.nombreSuperHeroe || 'este superhéroe';
        // renderiza la página de confirmación para eliminar un superhéroe
        return res.render('confirmarEliminar', {
            idHeroe: id,
            nombre,
        });
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).send('Error al cargar la confirmación');
    }
}

/** Eliminación desde formulario HTML: POST → redirección al dashboard. */
export async function eliminarSuperheroeFormularioController(req, res) {
    // intenta eliminar un superhéroe desde un formulario
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // elimina el superhéroe por id
        const resultado = await superheroesService.eliminarSuperheroePorId(id);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (resultado.notFound) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res.status(404).send('Superhéroe no encontrado');
        }
        // si la solicitud es inválida, devuelve un mensaje de error
        if (!resultado.ok) {
            // si la solicitud es inválida, devuelve un mensaje de error
            return res.status(400).send(
                (resultado.errores || ['No se pudo eliminar']).join(' '),
            );
        }
        // redirige a la página de dashboard
        return res.redirect(303, '/dashboard');
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).send('Error al eliminar el superhéroe');
    }
}

/** API / clientes que usan DELETE (JSON). */
export async function eliminarSuperheroeController(req, res) {
    // intenta eliminar un superhéroe
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // elimina el superhéroe por id
        const resultado = await superheroesService.eliminarSuperheroePorId(id);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (resultado.notFound) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }
        // si la solicitud es inválida, devuelve un mensaje de error
        if (!resultado.ok) {
            // si la solicitud es inválida, devuelve un mensaje de error
            return res.status(400).json({
                mensaje: 'No se pudo eliminar',
                errores: resultado.errores,
            });
        }
        return res.status(200).json({ mensaje: 'Superhéroe eliminado' });
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message,
        });
    }
}
